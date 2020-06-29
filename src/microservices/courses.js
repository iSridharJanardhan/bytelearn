import {
    AxiosClientWithToken
} from "../utils/axiosClient";


class CourseApi {
    static getProgramListByCourseName = async ( courseTypePayload ) => await AxiosClientWithToken.post('/courses', courseTypePayload );

    static getLessonsListByProgramName = async ( lessonTypePayload ) => await AxiosClientWithToken.post('/courses', lessonTypePayload );

    static getVideoListByLessonName = async ( lessonPathPayload ) => await AxiosClientWithToken.post('/courses', lessonPathPayload )
}

export default CourseApi