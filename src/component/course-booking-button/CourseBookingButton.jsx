import React from "react"
import './CourseBookingButton.scss'
//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------

function CourseBookingButton(props) {
    //---------------
    const { currentUser } = props
    //該使用者的id
    const currentUserId = currentUser ? currentUser.id : ''
    //---------------

    //確認此課程是否已被該會員預約
    const checkBooking = props.thisUserBookingId.indexOf(props.value)

    //確認該課程預約狀況
    const checkBookingState = props.bookingData && props.bookingData.filter(m => m.courseId === props.value && m.memberId === currentUserId).map(bookedCourse => (bookedCourse.bookingState))

    //可預約button
    const displayBookingBtn = (
        <>
            <button value={props.value} onClick={() => props.myConfirmAddBooking(props.addBooking)} className="accessBooking courseBtn">預約</button>
        </>
    )

    //若曾預約，視預約狀況顯示button
    function displayBookedBtn() {
        if (+checkBookingState === 0) {
            return (
                <>
                    <button value={props.value} className="canceledBooked courseBtn">已取消</button>
                </>)
        } else {
            return (
                <>
                    <button value={props.value} className="alreadyBooked courseBtn" onClick={() => props.myConfirmCancelBooking(props.userCancelBooking)}> 取消預約</button>

                </>)
        }
    }

    return (
        <>
            {+checkBooking === -1 ? displayBookingBtn : displayBookedBtn()}
        </>
    )
}

//---------------
const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelect,
});
export default withRouter(connect(mapStateToProps)(CourseBookingButton));
  //---------------