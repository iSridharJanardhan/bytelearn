import React from "react";
import { 
   AxiosClientWithToken 
} from "../../utils/axiosClient";
import Dashboard from "../dashboard"
 

class App extends React.Component{
    
    state = {}

    render(){
            return <Dashboard />
    }
}

export default App