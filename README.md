# Performance Testing with Customized k6

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/farshaddavoudi/Blazor.PersianDatePicker/master/LICENSE)

<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/k6-reporter.png" alt="k6 Performance Testing Summary">

## How To Use

### 1. Install k6

Ensure k6 is installed on your system.

### 2. Clone the Project

Clone the repository and preferably open it with VS Code.

Make sure to run the test command in the same path where the project is cloned. The report will also be generated in this path.

### 3. Configure Your Test Scenario

Edit the `test-scenarios.js` file to define your test scenarios. You can add load, stress, spike, and soak test scenarios for easy use in the main script.

> 💡 To calculate the real concurrent users capacity of your application (usually the peak phase), flag the phase with `usersCapacityCalcRef: true` as shown below:
```js
export let scenario_15min = [
  { duration: "30s", target: 100 }, 
  { duration: "20s", target: 500 }, 
  { duration: "3m", target: 1300 }, 
  { duration: "3m", target: 2000 }, 
  { duration: "10m", target: 2000, usersCapacityCalcRef: true }, // Set it in peak phase
  { duration: "60s", target: 0 }, 
];
```

### 4. Configure Your HTTP Requests

Edit the `test-http-requests.js` file to define your HTTP GET or POST or Put or Delete requests as objects with the appropriate URL, body, and headers. This allows for easy reuse of these requests.

```js
const url1 = "https://httpbin.test.k6.io/get";
const url2 = "https://test.k6.io";
const url3 = "https://httpbin.test.k6.io/post";

export const testEndpoint1 = {
  method: "GET",
  url: url1,
};

export const testEndpoint2 = {
  method: "GET",
  url: url2,
};

export const testEndpoint3 = {
  method: "GET",
  url: url3,
};
```

### 5. Modify the Main Script

Edit only the *TEST SETTINGS* block in the test.js file.

```js
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

// rest of script
```

### 6. Run the Test

Execute the test with the command: `k6 run test.js`

The result will be saved in the same folder and can be accessed as a simple HTML page.

### 7. Subsequent Runs

For subsequent tests, modify the TEST SETTINGS section only. All scenarios are defined in the `test-scenarios.js` file and all HTTP requests are in the `test-http-requests.js` file. Run the test again as needed.

## What Am I Trying to Achieve Here?

### 1. Enhanced k6 HTML Reporter

By integrating the k6 HTML-reporter, you can replace the plain text CLI results with a more visually appealing results also enabling to easily keep historical records of test results. Although not the ultimate visualization tool for k6, it significantly improves readability and tracking over the CLI summary. Advanced visualizations can be achieved by exporting data to InfluxDB and visualizing with Grafana, but for many businesses, the HTML report suffices.

> 💡 No changes or additional setup are required for this HTML report to work. Simply use the `performance-test.js` script, and it will generate `results.html` in the same directory. This file can then be easily saved for historical records.

### 2. Enhanced Error Tracking with Custom Metrics

To better understand `status_code=0` errors, especially during stress and spike tests, custom metrics have been added. These metrics utilize the `error_code` parameter in k6, providing more insight into the errors encountered.
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/custom-metrics.png" alt="Custom Metrics">

### 3. Improved Test Result Analysis

The top eight boxes in the test results are crucial for analysis:

- **Total Requests**: Total number of requests sent to the server.
- **Failed Requests**: Number of failed HTTP requests, including timeouts, connection errors, and non-2xx status codes.
- **2xx Responses**: Requests with a 2xx status code response. This is a basic success metric.
- **Success Rate**: Percentage of requests resulting in 2xx status codes.
- **Breached Thresholds**: Are the test has passed the criteria has been defined or not? If not, it is bad :(
- **Failed Checks**: Invalidated HTTP responses by some checks, can be *status code check* and/or *response time check*, etc.
- **Peak RPM**: The total healthy requests in the peak phase (we define it in our scenario by setting `usersCapacityCalcRef: true` flag).
- **Users Capacity**: It's very important criteria. Generally speaking, every team member (specially managers) love to know how many users can work simultaneously in the application!


### 4. Estimating Real-World User Capacity

Converting Virtual Users (VUs) to real-world users involves several steps:

1. **Ensure the test passes without breaching any thresholds.** This means knowing your application's limits.
    ```js
    stages: testScenario,

      thresholds: {
        http_req_duration: [`p(95)<${maxAcceptableResponseTime * 1000}`],
      },
    ```
    > 💡 This threshold means 95% of requests must complete within the acceptable response time.

2. **Specify the RPM (requests per minute) of real-world users.** For example, if a user makes 10 requests in 5 minutes, that's 2 RPM. It's different for each application. Set it in *TEST SETTINGS* section of main script.

3. **Run the test in a real scenario.** Tests should be long enough (at least 40 minutes) to gather meaningful data. Truth to be told, I do most of my tests in a 15 minutes scenario, but final tests should be in longer duration mimik a more natual pressure flow and behaviour. 
    > 💡 Focus on the peak phase to determine the maximum concurrent users the application can handle. We don't want to consider phases that are warm up and the load pressure is not as high as the system under test can gracefully handle.
  
### 5. Implementing a Graceful Rate Limit

Setting a rate limit ensures that the system remains stable under load, preventing overwhelming the server and drastically increasing response times. This involves limiting both individual user calls and total concurrent users.

## Additional Notes

- Tests should run for more than 30 minutes while monitoring server CPU and RAM usage.
- k6 integrates with Grafana for advanced visualizations.
- Testing in a Kubernetes cluster can help determine the necessary resources to handle expected traffic.
- One approach to see the limits in K8s cluster is we can test with a tiny container with limited resources and then determine how much instances do we need to support the traffic load that we need.
- Monitor your testing environment (e.g., your server's CPU, RAM, and network status) to avoid bottlenecks.
- Custom metrics are displayed only if they have non-zero values.

## Special Thanks

This project is ported from the [k6-reporter](https://github.com/benc-uk/k6-reporter) project with customizations and optimizations for easier and more effective k6 usage. Thanks to Ben Coleman (@benc-uk) and all contributors.
