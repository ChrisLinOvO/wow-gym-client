import React from "react"
import "./DayContainer.scss"
import CourseBox from "../Course-box/CourseBox"

function DayContainer(props) {

    const filterCourses = props.newCourses && props.newCourses
        .filter(course => course.courseTime.split(' ')[0] === props.title)
        .map(course => (
            <CourseBox
                key={course.courseId}
                value={course.courseId}
                course={course}
                bookingData={props.bookingData}
                getBookingData={props.getBookingData}
                thisUserBookingId={props.thisUserBookingId}
                setNewCourses={props.setNewCourses}
            />))

    return (
        <>
            <div className="dayContainer">
                <div className="day">{props.title}</div>
                <div className="courseBoxWrapper">
                    <div className="courseBoxContainer">{filterCourses}</div>
                </div>
            </div>
        </>
    )
}

export default DayContainer