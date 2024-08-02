# Performance Testing with Customized k6

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/farshaddavoudi/Blazor.PersianDatePicker/master/LICENSE)

<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/summary.png" alt="k6 Performance Testing Summary">

## How To Use

### 1. k6 should be installed

### 2. Clone the project. Preferrably open it with VS Code

### 3. Config your Test Scenario in the `test-scenarios.js` file

### 4. Config your HTTP Request in the `test-http-requests.js` file

### 5. Modify main script `test.js` only in SETTINGS block section.

### 6. Run the test: `k6 run test.js`

## What Am I Trying to Achieve Here?

### 1. Enhanced k6 HTML Reporter

By integrating the k6 HTML-reporter, you can replace the plain text CLI results with a more visually appealing results also enabling to easily keep historical records of test results. Although not the ultimate visualization tool for k6, it significantly improves readability and tracking over the CLI summary. Advanced visualizations can be achieved by exporting data to InfluxDB and visualizing with Grafana, but for many businesses, the HTML report suffices.

> 💡 No changes or additional setup are required for this HTML report to work. Simply use the `performance-test.js` script, and it will generate `results.html` in the same directory. This file can then be easily saved for historical records.

### 2. Enhanced Error Tracking with Custom Metrics

To better understand `status_code=0` errors, especially during stress and spike tests, custom metrics have been added. These metrics utilize the `error_code` parameter in k6, providing more insight into the errors encountered.
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/custom-metrics.png" alt="Custom Metrics">

### 3. Improved Test Result Analysis

The top five boxes in the test results are crucial for analysis:

- **Total Requests**: Total number of requests sent to the server.
- **Failed Requests**: Number of failed HTTP requests, including timeouts, connection errors, and non-2xx status codes.
- **OK Responses**: Requests with a 200 status code response. This is a basic success metric.
- **Failed Checks**: Invalidated HTTP responses by some checks, can be not a success code and/or long response time, etc.
- **Success Rate**: Percentage of requests resulting in 2xx status codes.

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

2. **Specify the RPM (requests per minute) of real-world users.** For example, if a user makes 10 requests in 5 minutes, that's 2 RPM.
    <img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/real-user-rpm.png" alt="Real User RPM">

3. **Run the test in a real scenario.** Tests should be long enough (at least 40 minutes) to gather meaningful data.
    > 💡 Focus on the peak phase to determine the maximum concurrent users the application can handle.
    <img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/tag-stress-load-phase.png" alt="Stress Load Phase">

    At the end, display the results:
    <img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/show-real-users-in-summary.png" alt="Real Users in Summary">

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
