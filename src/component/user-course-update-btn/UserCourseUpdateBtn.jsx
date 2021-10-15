import React from "react";
import "./UserCourseUpdateBtn.scss"

function UserCourseUpdateBtn(props) {

    const nowTime = Date.now()
    // console.log(props)
    const courseTime = props.filterCoursesOfData && props.filterCoursesOfData.filter(i => i.courseId === props.userCourseId).map(p => p.courseTime2)
    // console.log(aa)
    function displayUserBookingButton() {
        if (courseTime < nowTime) {
            return (
                <>
                    <button
                        className="userFinishedBtn"
                        value={props.userBookingId}
                    >
                        已完成課程
             </button>
                </>
            )
        } else {
            return (
                <>
                    <button
                        className="userUpdateBtn"
                        value={props.userBookingId}
                        onClick={() => props.userConfirmUpdateBooking(props.userCancelBooking)}>
                        按我取消
             </button>
                </>
            )
        }
    }
    const displayUserCancelButton = (
        <>
            <button
                value={props.userCourseId}
                className="userCanceledBtn">
                已取消
             </button>
        </>
    )
    return (
        <>
            {+props.getThisBookingState === 0 ? displayUserCancelButton : displayUserBookingButton()}
        </>
    )
}
export default UserCourseUpdateBtn;