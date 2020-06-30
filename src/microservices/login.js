import {
    AxiosClient
} from "../utils/axiosClient";


class LoginApi {
    static login = async ( loginPayload ) => await AxiosClient.post('/login', loginPayload );
}

export default LoginApi