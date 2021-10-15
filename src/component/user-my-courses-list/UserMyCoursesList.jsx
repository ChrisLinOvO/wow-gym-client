import React from "react"
import UserMyCourses from "../user-my-courses/UserMyCourses"

function UserMyCoursesList(props) {
    const myCourses = props.filterCoursesOfData.map(userCourse => (
            <UserMyCourses
                key={userCourse.courseId}
                userCourseId={userCourse.courseId}
                userCourse={userCourse}
                userBooking={props.userBooking}
                allCoursesOfThisUser={props.allCoursesOfThisUser}
                setAllCoursesOfThisUser={props.setAllCoursesOfThisUser}
                getCoursesDataInAllUser={props.getCoursesDataInAllUser}
                getUserBooking={props.getUserBooking}
                choose={props.choose}
                filterCoursesOfData={props.filterCoursesOfData}
            />))
    // console.log(aa)
    return (
        <>
            {myCourses}
        </>
    )
}
export default UserMyCoursesList