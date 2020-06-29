import React from "react";
import { withRouter } from "react-router";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";  

import CourseList from "../../containers/courseList";
import LessonByCourseName from "../../containers/lessonsByCourseName";

class AppRoutes extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Switch>
                <Route exact path="/course/:courseType">
                    <CourseList/>
                </Route>
                <Route exact path="/course/:courseType/:lessonPath">
                    <LessonByCourseName/>
                </Route>
                <Route path="*">
                    <Redirect to="/course/Udemy" />
                </Route>
            </Switch>
        )
    }
}

export default withRouter(AppRoutes)