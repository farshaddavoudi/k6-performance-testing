import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";
import { htmlReport } from "./HtmlReporter.js";
import { usersCapacityCalPhases, logUsersCapacityPhases } from "./helper.js";
import * as httpRequests from "./test-http-requests.js";
import * as scenarios from "./test-scenarios.js";

// ####################### TEST SETTINGS ###########################

// ## HTTP request to call. HTTP requests can be found and modified in `./test-http-requests.js` file
const targetHttpEndpoint = httpRequests.testEndpoint;
// ## Scenario (staging) for the test. Scenarios can be found and modified in `./test-scenarios.js` file
let targetScenario = scenarios.scenario_1min;
// ## Max acceptable response time - otherwise the check fails for the request
const responseTimeThreshold = 5;
// ## Real users average requests per minutes in your app
const realUsersRPM = 3;
// ## Set to true if you want to show the CLI result as well
const showCliResult = false;
// ## The generated HTML report page title. Things you want to remember in case of saving it and try to see it later
const htmlReportTitle = "Server x - 16 Replicas - Internal Net - 2000 VUs";

// #################### END OF TEST SETTINGS ########################

const usersCapacityPhases = usersCapacityCalPhases(targetScenario);

let counterOkResponses = new Counter("ok_responses");
let counter429 = new Counter("http_429_errors");
let counter503 = new Counter("http_503_errors");
let counter504 = new Counter("http_504_errors");

// k6 error_codes: https://k6.io/docs/javascript-api/error-codes/
let counterTimeoutErrors = new Counter("timeout_errors");
let counterTcpErrors = new Counter("tcp_errors");
let counterDnsErrors = new Counter("dns_errors");
let counterTlsErrors = new Counter("tls_errors");
let counterHttp5xxErrors = new Counter("http5xx_errors");
let counterOtherErrors = new Counter("other_errors");

const counterUsersCapacityPhaseSuccesses = new Counter(
  "users_capacity_phases_successes"
);

export let options = {
  insecureSkipTLSVerify: false,

  //vus: 2000, //virtual users no
  //duration: "60s", //how long tests to be run

  stages: targetScenario,

  thresholds: {
    http_req_duration: [`p(95)<${responseTimeThreshold * 1000}`],
  },
};

const testStartTime = Date.now();

export default function () {
  let responses = http.batch([targetHttpEndpoint]);

  // I test againt one endpoint. You can configure to send batch requests easily. Everything is ready for you, just some tweaks are needed :)
  let res = responses[0]; 

  // Calculate the elapsed time in seconds since the test started
  const elapsedTime = (Date.now() - testStartTime) / 1000;

  let isUserCapacityCalculationPhase = false;

  if (usersCapacityPhases.isConfigured) {
    isUserCapacityCalculationPhase = usersCapacityPhases.phases.some(
      (phase) => elapsedTime >= phase.phaseStart && elapsedTime < phase.phaseEnd
    );
  }

  let checkSuccess = check(res, {
    "status is 200": (r) => r.status === 200,
    [`response time is less than ${responseTimeThreshold}s`]: (r) =>
      r.timings.duration < responseTimeThreshold * 1000,
  });

  // Increment the custom counter for successful responses during stress load
  if (checkSuccess && isUserCapacityCalculationPhase) {
    counterUsersCapacityPhaseSuccesses.add(1);
  }

  if (res.status === 200) {
    counterOkResponses.add(1);
    if (true && Math.random() < 0.001) {
      // Randomly decide whether to log the response
      // x * 100 % chance
      console.log("Ok Resp. body:", res.body);
    }
  } else if (res.status === 0) {
    errorHandlerAndLogger(res);
  } else {
    // Handle specific HTTP status codes
    switch (res.status) {
      case 429:
        // Request failed: Too Many Requests (429)
        errorHandlerAndLogger(res);
        counter429.add(1);
        break;
      case 503:
        // Request failed: Service Unavailable (503)
        errorHandlerAndLogger(res);
        counter503.add(1);
        break;
      case 504:
        // Request failed: Gateway Timeout (504)
        errorHandlerAndLogger(res);
        counter504.add(1);
        break;
      default:
        errorHandlerAndLogger(res);
        break;
    }

    sleep(1); // Wait for 1 second before making another request
  }
}

export function handleSummary(data) {

  logUsersCapacityPhases(usersCapacityPhases);

  if (usersCapacityPhases.isConfigured) {
    let usersCapacityPhasesRequests =
      data.metrics.users_capacity_phases_successes.values.count;

    let usersCapacityPhasesTestDurationMinutes =
      usersCapacityPhases.totalPhasesDurationInMinutes;

    const peakRPM = Math.round(
      usersCapacityPhasesRequests / usersCapacityPhasesTestDurationMinutes
    );

    data.metrics.peak_rpm = {
      type: "counter",
      contains: "default",
      values: {
        count: peakRPM,
      },
    };

    const usersCapacity = Math.round(peakRPM / realUsersRPM);

    data.metrics.real_users_capacity = {
      type: "counter",
      contains: "default",
      values: {
        count: usersCapacity,
      },
    };
  }

  if (showCliResult) {
    return {
      "result.html": htmlReport(data, { title: htmlReportTitle, debug: false }),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  } else {
    return {
      "result.html": htmlReport(data,  { title: htmlReportTitle, debug: false }),
    };
  }
}

function errorHandlerAndLogger(res, tags = {}) {
  const traceparentHeader = res.request.headers["Traceparent"];
  const errorData = Object.assign(
    {
      url: res.url,
      status: res.status,
      error_code: res.error_code,
      traceparent: traceparentHeader && traceparentHeader.toString(),
    },
    tags
  );

  if (res.error_code === 1050) {
    counterTimeoutErrors.add(1);
  } else if (res.error_code === 1000) {
    counterOtherErrors.add(1);
  } else if (res.error_code >= 1100 && res.error_code <= 1199) {
    counterDnsErrors.add(1);
  } else if (res.error_code >= 1200 && res.error_code <= 1299) {
    counterTcpErrors.add(1);
  } else if (res.error_code >= 1300 && res.error_code <= 1399) {
    counterTlsErrors.add(1);
  } else if (res.error_code >= 1500 && res.error_code <= 1599) {
    counterHttp5xxErrors.add(1);
  } else {
    console.log(errorData);
  }
}
