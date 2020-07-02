import React from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Paper,
    Tabs,
    Tab,
    Button,
    Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {
    courses as CourseList
} from "../../constants/coursesList";
import AppRoutes from "../../routes/appRoutes/";
import CourseApi from "../../microservices/courses";
import LoginApi from "../../microservices/login";
import { withRouter, Redirect } from "react-router";
import TextField from '@material-ui/core/TextField';



import "./index.css"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isError: false,
        tabSelected: 0,
        isAuthenticated: false,
        error: false,
        errorInfo: ""
    }

    async componentDidMount() {
        const token = localStorage.getItem("bytelearn-auth");
        if (token) {
            const courseType = this.props.location.pathname;
            const payload = {
                courseType: "Udemy"
            }
            const courses = await CourseApi.getProgramListByCourseName(payload);
            if (!courses.data.status) {
                this.setState({
                    isAuthenticated: true
                })
                switch (courseType) {
                    case courseType.includes("Udemy"):
                        return this.setState({
                            tabSelected: 0
                        })
                    case courseType.includes("Udacity"):
                        return this.setState({
                            tabSelected: 1
                        })
                    default:
                        this.setState({
                            tabSelected: 0
                        })
                }
            } else {
                localStorage.removeItem("bytelearn-auth")
                this.props.history.push('/')
            }
        }


    }


    _handleTabSelection = (event, newValue) => {
        this.setState({
            tabSelected: newValue
        })
        const selectedCourse = CourseList[newValue].value;
        // this.props.history.push(`/course/${selectedCourse}`);
        window.location.href = `/#/course/${selectedCourse}`
    }

    _loginFormHandler = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    _handelSubmit = async () => {
        let payload = {}
        payload.username = this.state.username
        payload.password = this.state.password
        const response = await LoginApi.login(payload);
        if (!response.data.status) {
            localStorage.setItem("bytelearn-auth", response.data.token)
            this.setState({
                isAuthenticated: true,
                username: "",
                password: ""
            })
        } else {
            this.setState({
                error: true,
                errorInfo: response.data.error,
                username: "",
                password: ""

            })
        }
    }

    _loginForm = () => {
        return (
            <Paper style={{ width: "30%", margin: "auto", marginTop: "2%" }}>
                <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/a72c2696-c01b-4cfa-9ba5-b2ea8013ab0a/dbwpyse-4200590f-f5fe-4217-91f7-547749142e84.png"
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                />
                <div style={{ padding: "10px", textAlign: "center" }}>
                    <TextField
                        onChange={(event) => {
                            this._loginFormHandler(event.target.value, "username")
                        }}
                        label="Username"
                        style={{
                            marginBottom: "10px",
                            width: '100%'
                        }}
                    />
                    <TextField
                        onChange={(event) => {
                            this._loginFormHandler(event.target.value, "password")
                        }}
                        type="password"
                        label="Password"
                        style={{
                            marginBottom: "10px",
                            width: '100%'
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            width: "70%",
                            marginBottom: "20px"
                        }}
                        onClick={this._handelSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        )
    }





    render() {
        return (
            <AppBar
                position="static"
                style={{
                    boxShadow: `0px 0px 0px`,
                    backgroundColor: ' white',
                    color: 'black'
                }}
            >
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => this.props.history.push('/')}>
                        <b>Bytelearn</b>
                    </Typography>
                    {
                        this.state.isAuthenticated ?
                            <Button onClick={() => {
                                this.setState({
                                    isAuthenticated: false
                                })
                                localStorage.removeItem('bytelearn-auth');
                                return <Redirect to="/login" />
                            }} color="inherit">Logout</Button>
                            :
                            ""
                    }
                </Toolbar>
                {
                    this.state.isAuthenticated ?
                        <>
                            <Paper
                                style={{
                                    boxShadow: '0px 0px 0px'
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
                                            CourseList.map(course => <Tab key={course.label} label={course.label} />)
                                        }
                                    </Tabs>
                                </div>
                            </Paper>
                            <AppRoutes />
                        </>
                        :

                        <h1>
                            {this._loginForm()}
                        </h1>
                }
                <Snackbar open={this.state.error} onClose={() => this.setState({ error: false, errorInfo: "" })} autoHideDuration={3000}>
                    <MuiAlert onClose={() => this.setState({ error: false, errorInfo: "" })} severity="error">
                        {this.state.errorInfo}
                    </MuiAlert>
                </Snackbar>
            </AppBar>
        )
    }
}

export default withRouter(Dashboard)