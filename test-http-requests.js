// Modify the variables and the code according to your needs
// Requests are defined as objects: https://grafana.com/docs/k6/latest/javascript-api/k6-http/batch/

const url1 = "https://httpbin.test.k6.io/get";
const url2 = "https://test.k6.io";
const url3 = "https://httpbin.test.k6.io/post";

export const testEndpoint = {
  method: "GET",
  url: url1,
};

export const req2Example = {
  method: "GET",
  url: "https://test.k6.io",
};

export const req3Example = {
  method: "POST",
  url: "https://httpbin.test.k6.io/post",
  body: {
    hello: "world!",
  },
  params: {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  },
};
