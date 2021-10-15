import axios from "axios";

// API's URL
let ApiUrl = "https://cdn-test.test.aws.the8app.com/"

export default axios.create({
  baseURL: ApiUrl,
  responseType: "json"
});