import Axios from "axios";

export let AxiosClient = Axios.create();

AxiosClient.defaults.baseURL = "api.bytelearn.ml";

export let AxiosClientWithToken = Axios.create();

AxiosClientWithToken.defaults.baseURL = " http://api.bytelabs.ml";
AxiosClientWithToken.defaults.headers = {
    "content-type" : "application/json",
    "auth" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhbWVmcmVha3MiLCJ1c2VyaWQiOiI1ZWYxMDA2ODU0OWZiMjM2NTA2NDdiMDQiLCJpYXQiOjE1OTI5MDYyODksImV4cCI6MTU5MzUxMTA4OX0.Wui7l6dDy6vzbkdruWc1QumRdLcQ60nVzL_QijpkrVo",
    "Access-Control-Allow-Headers" : "*"
};
