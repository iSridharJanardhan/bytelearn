import React from "react";
import { withRouter } from "react-router";
import _Get from "lodash/get";
import CourseApi from "../../microservices/courses";
import UdemyRenderer from "../../components/udemyRender";
class LessonByCourseName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courseType:"",
            lessonList:[]
        }
    }

    async componentDidMount(){
        try{
            const coursePath = _Get(this.props, "match.params.lessonPath");
            const courseType = _Get(this.props, "match.params.courseType")
            const payload = {
                courseType,
                path : `/${coursePath}`
            }
            const lessonList = await CourseApi.getLessonsListByProgramName(payload);
            this.setState({
                lessonList:lessonList.data.data,
                courseType
            })
        }catch(error){
            
        }
        
    }

    _generateContent = () => {
        switch(this.state.courseType){
            case 'Udemy':
                return <UdemyRenderer 
                    lessonList={this.state.lessonList}
                />
            default:
                return ""
        }
    }
    render(){
        return this._generateContent()
    }
}

export default withRouter(LessonByCourseName)