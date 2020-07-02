import React from "react";
import { withRouter } from "react-router";
import {
    Switch,
    Route,
    Redirect,
    HashRouter
} from "react-router-dom";  

import CourseList from "../../containers/courseList";
import LessonByCourseName from "../../containers/lessonsByCourseName";

class AppRoutes extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <HashRouter>
                 <div>
                <Route exact path="/course/:courseType">
                    <CourseList/>
                </Route>
                <Route exact path="/course/:courseType/:lessonPath">
                    <LessonByCourseName/>
                </Route>
                <Route path="*">
                    <Redirect to="/course/Udemy" />
                </Route>
            </div>
            </HashRouter>
        )
    }
}

export default withRouter(AppRoutes)