import React from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Paper,
    Tabs,
    Tab
} from "@material-ui/core";
import {
    courses as CourseList
} from "../../constants/coursesList";
import AppRoutes from "../../routes/appRoutes/";
import { withRouter } from "react-router";

import "./index.css"

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        isError: false,
        tabSelected: 0
    }


    _handleTabSelection = ( event, newValue ) => {
        this.setState({
            tabSelected: newValue
        })
        const selectedCourse = CourseList[newValue].value;
        this.props.history.push(`/course/${selectedCourse}`);
    }

    render(){
        return(
                <AppBar
                    position="static"
                    style={{
                        boxShadow:`0px 0px 0px`,
                        backgroundColor:' white',
                        color:'black'
                    }}
                >   
                    <Toolbar>
                        <Typography variant="h6">
                            <b>Bytelearn</b>
                        </Typography>
                    </Toolbar>
                    <Paper 
                        style={{
                            boxShadow:'0px 0px 0px'
                        }}
                    >
                        <div key={this.state.tabSelected}>
                            <Tabs                            
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                value={this.state.tabSelected}
                                onChange={this._handleTabSelection}
                                
                            >
                                {
                                    CourseList.map( course => <Tab key={course.label} label={course.label}/>  )
                                }
                            </Tabs>
                        </div>
                    </Paper>
                    <AppRoutes />
                </AppBar>
        )
    }
}

export default withRouter(Dashboard)