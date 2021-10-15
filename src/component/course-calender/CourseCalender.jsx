import React from "react"
import "./CourseCalender.scss"
import DayContainer from "../day-container/DayContainer"
//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------

function CourseCalender(props) {
 
    //---------------
    const { currentUser } = props
    //該使用者的id
    const currentUserId = currentUser ? currentUser.id : ''
    //---------------

   //找到該會員已預約的課程id
   const thisUserBookingId = props.bookingData && props.bookingData.filter(m => m.memberId === currentUserId).map(bookedCourse => (bookedCourse.courseId))
  //  console.log(thisUserBookingId)

  return (
    <>
      <div className="schedule">
        <DayContainer
          title={'Mon'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}          
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Tue'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Wed'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Thu'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Fri'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Sat'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Sun'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
      </div>
    </>
  )
}
//---------------
const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(CourseCalender));
//---------------
