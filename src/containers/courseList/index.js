import React from "react";
import { withRouter } from "react-router";
import _Get from "lodash/get";
import {
    CircularProgress,
    Paper,
    Grid 
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import CourseApi from "../../microservices/courses";
import { fromPairs } from "lodash";


class CourseList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses : [],
            loading:false,
            hasError: false,
            courseType:""
        }
    }

    _getCourseList = async (courseType) => {
        try{
            this.setState({
                loading:true
            })
            const payload = {
                courseType
            }
            const courses = await CourseApi.getProgramListByCourseName(payload);
            if(_Get(courses.data.status)){
                throw new Error(courses.data.error)
            }
            this.setState({
                courses : courses.data.data,
                bufferCourses:courses.data.data,
                loading:false
            })
        }catch(error){
            this.setState({
                hasError:true,
                errorMessage:error.message,
                loading: false
            })
        }
    }

    async componentDidMount(){
        let courseType =_Get( this.props,'match.params.courseType')
        await this._getCourseList(courseType);
        
    }

    async componentDidUpdate(prevProps, prevState){
        let courseType =_Get( this.props,'match.params.courseType')
        if(this.state.courseType !== courseType){
            this.setState({
                courseType
            })
            await this._getCourseList(courseType);
        }
    }

    _getLessonsByCourseName = ( coursePath ) => this.props.history.push(`/course/${this.state.courseType}${coursePath}`);
    
    _generateUdemyList = () => {
        if(this.state.courses && this.state.courses.length){
            return this.state.courses.map( course => {
            return(
                <Grid item lg={3} xs={12}>
                    <Zoom in={true}>
                        <Paper style={{height:"100px", margin:"10px", textAlign:"center", cursor:"pointer"}} elevation={3} onClick={() => this._getLessonsByCourseName(course.path)}>
                            <a style={{
                                verticalAlign:"middle",
                                lineHeight:"90px",
                                margin:"auto",
                                
                            }}>
                            {course.name}
                            </a>
                            </Paper>
                    </Zoom>
                </Grid>
            )
        } )
        }else{
            return ""
        }
    }

    _generateUdacityList = () => {
        if(this.state.courses && this.state.courses.length){
            return this.state.courses.map( course =>{
                return(
                    <Grid item lg={3} xs={12}>
                         <Zoom in={true}>
                            <a style={{textDecoration:"none"}} target="_blank" href={`http://files.bytelabs.ml/${course.path}`}>
                                <Paper style={{height:"100px", margin:"10px", textAlign:"center", cursor:"pointer"}} elevation={3} >
                                <a style={{
                                    verticalAlign:"middle",
                                    lineHeight:"90px",
                                    margin:"auto"
                                }}>{
                                    course.name
                                    .replace("UDACITY", " ")
                                    .replace("udacity", " ")
                                    .replace("Udacity", " ")
                                    .replace("-", " ")                        
                                }</a>
                                    </Paper>
                            </a>
                         </Zoom>
                    </Grid>
            )
        })
        }else{
            return ""
        }
    }

    _generateCourseList = () => {
        const courseType = _Get( this.props,'match.params.courseType');

        switch(courseType){
            case "Udemy":
                return (
                    <Grid container>
                        {this._generateUdemyList()}
                    </Grid>
                    )
            case "Udacity":
                return(
                    <Grid container>
                        {this._generateUdacityList()}
                    </Grid> 
                )
            default:
                return ""
        }
    }

    render(){
        if(this.state.loading){
            return <Backdrop invisible={true} open={this.state.loading} >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
        if(this.state.hasError){
        return <Alert severity="error">{this.state.errorMessage}</Alert>
        }
        return (
            <div style={{margin:"20px"}}>
                <TextField 
                    onChange={(event) => {
                        const searchedValue = event.target.value;
                        if(searchedValue){
                            const courses = this.state.courses.filter( course => course.name.toLowerCase().includes(searchedValue.toLowerCase()) );
                            this.setState({
                                courses
                            });
                        }else{
                            this.setState({
                                courses:this.state.bufferCourses
                            });
                        }
                    }}
                    label="Search by name"
                    style={{
                        marginBottom:"10px"
                    }}
                />
                {this._generateCourseList()}
            </div>
        )
    }
}

export default withRouter(CourseList)