# Performance Testing with Customized k6

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/farshaddavoudi/Blazor.PersianDatePicker/master/LICENSE)

<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/summary.png">

#### ***What do I'm trying to achieve here?***

### 1- Add k6 HTML-reporter instead of seeing plain text reslut in CLI for better observability and more elegant way of having results history

It's not the ultimate visualization we can get from k6, but by far better than the CLI summary I believe. It can be more customized with HTML teawks according the needs. More advanced visualization for k6 can be done with sending data to FluxDB (or other similar tools) and visualize them in Grafana. We do not talk about that approach here as for most businesses this HTML-report suffice. 

> #### 💡 No change or additional setup or flag or param in k6 standard CLI command is needed for this HTML-report to work. Just use the `performance-test.js` and it works out of the box, putting the result in same directory (`results.html`) which then can be saved anywhere easily (in browser and manually) to have test result history.

### 2- Fix the issue of not knowing the error cause (due to status = 0 error) in k6 by adding custom metrics

Sometimes we get a lot of `status_code=0` response from k6 specially when we do stress and spike tests. I've found there are another param in k6 named `error_code` which gives better understanding of what's happening. I created some custom metrics so they can be easier tracked. 
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/custom-metrics.png">

### 3- Better analyzing the test result

The 5 top boxes in the result are very important:

- **Total Requests**: It’s the total requests have been sent to the server.
- **Failed Requests**: A built-in metrics in k6 that tracks the number of failed HTTP requests including timeouts, connection errors, and any non-2xx status codes by default.
- **OK Responses**: The requests with 200 status code response. The only criteria is the 200 status and nothing else, therefore it’s not a very exact criteria to reflect a success test.
- **Failed Checks**: It’s to validate the HTTP response by asserting some conditions. The most important condition is 200 status code. The other can be for example the response time be less than 3 seconds (what’s the point of getting the 200 status code after 20 seconds?!) 
- **Success Rate**: It's rate of _OK Responses_ based on _Total Requests_. Basically percentage of requests resulted to 2xx status code response (without any additional checks of response duration, etc).

### 4- Try to calculate the real world users our app under test can handle simultaniously
It’s not easy to interpret VUs to real-world users. Real users interact with app which includes reading, thinking and processing information and making decisions.
To more exact calculate we need:


**1- Make sure the test passed by not breaching any thresholds. If any threshold breaks, we cannot continue and should rerun the test with lower load.**
Maximum VUs the test can be passed without any threshold breakout. So, we need to know what’s our application threshold.
```js
stages: testScenario,

  thresholds: {
    http_req_duration: [`p(95)<${maxAcceptableResponseTime * 1000}`],
  },
```
> 💡 This threshold means the 95% of requests must complete below `maxAcceptableResponseTime` seconds.

**2- Specify RPM of real-world users for our app.**
Average number of requests a real user makes per minute in our app. For example, if a user makes 10 requests in 5 minutes, that’s 2 RPM. We need to specify this for our app. For ATA app it’s not high as it’s not Instagram!
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/real-user-rpm.png">

**3- Run test in a real scenario. Real scenarios are long and cannot be less than 40 minutes.**
It’s the tricky part. We want the success RPM (request per minute) rate on the peak phase and divide it on real users RPM to determine how many concurrent users can work simultaneously.

> 💡 We only want to get the success requests in the peak phase as the test has other phases. It’s done by a trick in test script and first check if we’re in stress load phase (peak phase), then add the custom counter metrics (counterStressLoadSuccesses).
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/tag-stress-load-phase.png">

And at the end, show the result in summary:
<img src="https://github.com/farshaddavoudi/k6-performance-testing/blob/main/screenshots/show-real-users-in-summary.png">


### 5- Understand the necessity of set a graceful rate-limit on our app:
A rate limit to limit each user call and total concurrent users so the system can work seamlessly. Otherwise, the app will stifle and won’t work. For example, the response time will change from 5s to 50s because the system will be overwhelmed. We have to dump some requests in order to server being able to continue working.

#### Some Additional Notes:

– The test’s time should be long (more than 30 minutes) and we need to watch the server’s CPU and RAM during this time. It shouldn’t be like using CPU 100% and full of RAM.

– k6 is from Grafana and can be visualized by it. Needs to do some work. For next company, maybe :)

– One approach to see the limits in K8s cluster is we can test with a tiny container with limited resources and then determine how much instances do we need to support the traffic load that we need.

– k6 cloud is awesome. With charts, distributed loads and more options.

– The OS (server) you’re testing there (e.g. your Windows) is also important. Check you CPU and RAM and network status during test so it does not be like 100% CPU, etc.

– Custom metrics is only shown if they have a value (non 0) on them. 


#### Special Thanks:
  *This project is ported from [k6-reporter](https://github.com/benc-uk/k6-reporter) project with som customizations and optimizations for easy and effective use of k6. Therefore, I appreciate the great effort of Ben Coleman @benc-uk and all contributors of that project*
