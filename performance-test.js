import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";
import { htmlReport } from "./HtmlReporter.js"; // Use local customized file instead of: import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const maxAcceptableResponseTime = 2; //Seconds
const realUserRPM = 2;

let counterOkResponses = new Counter("ok_responses");
let counter429 = new Counter("http_429_errors");
let counter503 = new Counter("http_503_errors");
let counter504 = new Counter("http_504_errors");

// k6 error_codes: https://k6.io/docs/javascript-api/error-codes/
let counterTimeoutErrors = new Counter("timeout_errors");
let counterTcpErrors = new Counter("tcp_errors");
let counterTlsErrors = new Counter("tls_errors");
let counterHttp5xxErrors = new Counter("http5xx_errors");
let counterOtherErrors = new Counter("other_errors");

const counterStressLoadSuccesses = new Counter("stress_load_successes");

let stressTest1Min = [
  // Unreliable scenario. Just for quick test
  { duration: "20s", target: 100 },
  { duration: "30s", target: 100 },
  { duration: "10s", target: 0 },
];

let stressTestQuick = [
  { duration: "30s", target: 100 }, // warm-up (below normal load)
  { duration: `20s`, target: 100 },
  { duration: "10s", target: 500 }, // normal load
  { duration: "20s", target: 500 },
  { duration: "10s", target: 1000 }, // high load (below the breaking point)
  { duration: "20s", target: 1000 },
  { duration: "50s", target: 1500 }, // Stress load (around the breaking point)
  { duration: "11m", target: 1500 },
  { duration: "70s", target: 0 }, // scale down (recovery stage)
];

let stressTestOptimizedForUsersCount = [
  // DON'T CHANGE THE SCENARIO AND TIMES. ONLY TARGETS
  { duration: "2m", target: 100 }, // Warm-up
  { duration: "2m", target: 500 }, // Increase to normal load
  { duration: "2m", target: 1000 }, // Increase to high load
  { duration: "2m", target: 1500 }, // Gradual increase
  { duration: "20m", target: 2000 }, // Steady-state peak load (Stress Load)
  { duration: "2m", target: 1000 }, // Gradual decrease
  { duration: "2m", target: 500 }, // Decrease to normal load
  { duration: "2m", target: 100 }, // Decrease to below normal load
  { duration: "2m", target: 0 }, // Cool-down and recovery
];

let stressTestUltimate = [
  { duration: "2m", target: 100 }, // Warm-up
  { duration: "5m", target: 100 }, // Steady-state below normal load

  { duration: "2m", target: 500 }, // Increase to normal load
  { duration: "5m", target: 500 }, // Steady-state normal load

  { duration: "2m", target: 1000 }, // Increase to high load
  { duration: "10m", target: 1000 }, // Steady-state high load

  { duration: "2m", target: 1500 }, // Gradual increase
  { duration: "10m", target: 1500 }, // Steady-state

  { duration: "2m", target: 2000 }, // Peak load
  { duration: "20m", target: 2000 }, // Steady-state peak load

  { duration: "5m", target: 0 }, // Cool-down and recovery
];

// ################################### CHANGE THIS ############################
let testScenario = stressTestQuick;

const testScenarioSetForCalculateRealUsers = arraysEqual(
  testScenario,
  stressTestOptimizedForUsersCount
);

export let options = {
  insecureSkipTLSVerify: false,
  //noConnectionReuse: false, //It's for Socket

  //vus: 2000, //virtual users no
  //duration: "60s", //how long tests to be run

  // CHANGE THIS
  stages: testScenario,

  thresholds: {
    http_req_duration: [`p(95)<${maxAcceptableResponseTime * 1000}`],
  },
};

const testStartTime = Date.now();

export default function () {
  const url1 =
    "https://example1.com/api/get";
  const url2 =
    "https://example2.com/api/get";
  const url3 =
    "https://example3.com/api/get";
  const url4 = 
    "https://example4.com/api/get";

  // CHANGE THIS
  const url = url1;

  let res = http.get(url);

  // Calculate the elapsed time in seconds since the test started
  const elapsedTime = (Date.now() - testStartTime) / 1000;

  let isStressLoadPhase = false;

  if (testScenarioSetForCalculateRealUsers) {
    isStressLoadPhase = elapsedTime >= 8 * 60 && elapsedTime < 28 * 60; // 8-28 minute window
  }

  let checkSuccess = check(res, {
    "status is 200": (r) => r.status === 200,
    [`response time is less than ${maxAcceptableResponseTime}s`]: (r) =>
      r.timings.duration < maxAcceptableResponseTime * 1000,
  });

  // Increment the custom counter for successful responses during stress load
  if (checkSuccess && isStressLoadPhase) {
    counterStressLoadSuccesses.add(1);
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
  if (testScenarioSetForCalculateRealUsers) {
    const stressLoadRequests = data.metrics.stress_load_successes.values.count;
    const testDurationMinutes = 20; // Duration of the stress load phase in minutes
    const totalRPM = stressLoadRequests / testDurationMinutes;

    console.log(`Total RPM during stress load: ${totalRPM}`);
    console.log(`Equivalent Real Users: ${totalRPM / realUserRPM}`);
  }

  return {
    //'summary.json': JSON.stringify(data),
    "result.html": htmlReport(data),
    //stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
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

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
