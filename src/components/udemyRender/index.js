import React from "react";
import { withRouter } from "react-router";
import _Get from "lodash/get";
import {
    Grid,
    Paper
} from "@material-ui/core/";
import Skeleton from '@material-ui/lab/Skeleton';



import CourseApi from "../../microservices/courses";
import { Button } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import {
    fileRenderingUrl
} from "../../constants/const";
class UdemyRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            selectedLessonIndex:0
        }
    }

    componentDidMount() {
        this.setState({
            selectedLessonIndex: 0
        })
        if (this.props.lessonList && this.props.lessonList.length) {
            this._getVideoListByLessonName(this.props.lessonList[0].path)
        }

    }

    _getVideoListByLessonName = async (lessonPath, selectedLessonIndex) => {
        try {
            this.setState({
                videoLoading: true,
                selectedLessonIndex
            })
            const courseType = _Get(this.props, "match.params.courseType")
            const payload = {
                courseType,
                path: lessonPath
            }
            let videoList = await (await CourseApi.getLessonsListByProgramName(payload)).data.data
            videoList = videoList.filter(video => video.path.includes(".mp4"));

            let resourceList = videoList.filter(video => !video.path.includes(".mp4"));
            videoList = videoList.map(video => {
                const lessonSequence = video.name.split(".")[0]
                return {
                    ...video,
                    lessonSequence
                }
            }).sort((a, b) => {
                return a.lessonSequence - b.lessonSequence
            });
    
            this.setState({
                videoList,
                selectedVideo: videoList[0].path,
                selectedVideoIndex: 0,
                videoLoading: false
            })
        } catch (error) {

        }
    }

    _generateLessonsList = () => {
        const lessonList = this.props.lessonList.map(lesson => {
            const lessonSequence = lesson.name.split(".")[0]
            return {
                ...lesson,
                lessonSequence
            }
        }).sort((a, b) => {
            return a.lessonSequence - b.lessonSequence
        });
        return (
            <>
                {
                    lessonList.map((lesson, index) => {
                        return (
                            <>
                                <Paper elevation={6} style={this.state.selectedLessonIndex == (index || 0) ? {
                                    padding: "10px",
                                    margin: "10px", 
                                    backgroundColor: 
                                    "#3f51b5", 
                                    padding: "10px", 
                                    color: 'white',
                                    cursor:"pointer"
                                } : {
                                    padding: "10px",
                                    margin: "10px", 
                                    color: "", 
                                    fontWeight: "500", 
                                    padding: "10px",
                                    cursor:"pointer"
                                    }} onClick={() => this._getVideoListByLessonName(lesson.path, index)}><p>{lesson.name}</p></Paper>
                            </>
                        )
                    })
                }
            </>
        )
    }

    _gernerateVideoList = () => {
        
        return this.state.videoList.map((video, index) => {
            return <Paper
                elevation={6}
                style={this.state.selectedVideoIndex == (index || 0) ?
                    {
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer",
                        color: "white",
                        fontWeight: "500",
                        backgroundColor: "#3f51b5"
                    }
                    :
                    {
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer",
                        color: "",
                        fontWeight: "500"
                    }}
                onClick={() => {
                    this.setState({
                        selectedVideo: video.path,
                        selectedVideoIndex: index
                    })
                }}><p>{
                        video.name
                        .replace(".mp4", "")
                    }</p></Paper>
        })
    }

    _generateVideoRenderer() {
        if (this.state.videoLoading) {
            return (
                <Grid container>
                    <Grid item lg={9}>
                        <Skeleton animation="wave" variant="rect" style={{
                            width: '100%',
                            height: "60vh",
                            marginTop: "10%"
                        }} />
                    </Grid>
                </Grid>
            )
        }
        return (
            <Grid container>
                <Grid item lg={9}>
                    <div style={{ height: "60vh", marginTop: "10%" }}>
                        <video
                            autoPlay
                            style={{ width: "100%", height: "100%" }}
                            controls key={this.state.selectedVideo}
                            onEnded={() => {

                                if(this.state.selectedVideoIndex == this.state.videoList.length - 1){
                                    return 
                                }

                                if (this.state.selectedVideoIndex !== this.state.videoList.length) {
                                    this.setState({
                                        selectedVideo: this.state.videoList[this.state.selectedVideoIndex + 1].path,
                                        selectedVideoIndex: this.state.selectedVideoIndex + 1
                                    })
                                } else {
                                    return ""
                                }
                            }}
                        >
                            <source key={this.state.selectedVideo} src={`${fileRenderingUrl}/${this.state.selectedVideo}`} type="video/mp4" />
                        </video>
                    </div>
                    {
                        this.state.videoList.length > 1 ?
                            <Grid container style={{ padding: "10px" }}>
                                <Grid item lg={6}>
                                    <Button
                                        onClick={() => {
                                            if(this.state.selectedVideoIndex == this.state.videoList.length - 1){
                                                return 
                                            }
                                            this.setState({
                                                selectedVideo: this.state.videoList[this.state.selectedVideoIndex - 1].path,
                                                selectedVideoIndex: this.state.selectedVideoIndex - 1
                                            })
                                        }}
                                        disabled={this.state.selectedVideoIndex == 0}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Prev
                                </Button>
                                </Grid>
                                <Grid item lg={6} style={{ textAlign: "right" }}>
                                    <Button
                                        onClick={() => {
                                            if(this.state.selectedVideoIndex == this.state.videoList.length - 1){
                                                return 
                                            }
                                            this.setState({
                                                selectedVideo: this.state.videoList[this.state.selectedVideoIndex + 1].path,
                                                selectedVideoIndex: this.state.selectedVideoIndex + 1
                                            })
                                        }}
                                        disabled={this.state.selectedVideoIndex == this.state.videoList.length - 1 ? true : false}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Next
                                </Button>
                                </Grid>
                            </Grid>
                            :
                            ""
                    }
                </Grid>
                <Grid item lg={3}>
                    <h3 style={{ textAlign: "center" }}>
                        Videos
                        </h3>
                    {this._gernerateVideoList()}
                </Grid>
            </Grid>
        )
    }

    render() {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item lg={3}>
                        <h3 style={{ textAlign: "center" }}>
                            Sections
                        </h3>
                        {this._generateLessonsList()}
                    </Grid>
                    <Grid item lg={9}>

                        {this.state.videoList && this.state.videoList.length && this._generateVideoRenderer()}
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default withRouter(UdemyRenderer)