import Axios from "axios";

export let AxiosClient = Axios.create();

AxiosClient.defaults.baseURL = "http://api.bytelabs.ml";

export let AxiosClientWithToken = Axios.create();

AxiosClientWithToken.defaults.baseURL = " http://api.bytelabs.ml";
AxiosClientWithToken.defaults.headers = {
    "content-type" : "application/json",
    "auth" : localStorage.getItem("bytelearn-auth") || "",
    "Access-Control-Allow-Headers" : "*"
};
