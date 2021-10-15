import React, { useState, useEffect, useCallback } from "react";
import "./CourseBox.scss";
import CourseBookingButton from "../course-booking-button/CourseBookingButton";
import Swal from "sweetalert2";
import Fade from 'react-reveal/Fade';
//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------

function CourseBox(props) {

    //---------------
    const { currentUser } = props
    //該使用者的id
    const currentUserId = currentUser ? currentUser.id : ''
    //---------------
    const [num, setNum] = useState([props.course.numberOfCourse])
    const [changeState, setChangeState] = useState(false)
    const [changeState2, setChangeState2] = useState(false)
    // console.log( [props.course.numberOfCourse])
    // console.log(currentUser)

    //將現在時間的星期轉換成毫秒
    const nowTime = Date.now()
    //抓資料裡的課程時間(毫秒)
    const getTimeInData = props.course.courseTime2
    let t = props.course.courseTime
    let newT = t.split(/[' ']/)[3]
    // 該課程id
    const getThisCourseId = props.course.courseId
// console.log(props.value)
    //新增人數到資料庫
    async function getAddNumFromData() {
        const addNumPost = {
            courseId: getThisCourseId,
        }
        const req = new Request("http://localhost:5000/api/courses/addNumOfCourse", {
            method: 'POST',
            body: JSON.stringify(addNumPost),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const res = await fetch(req)
        const newData = await res.json()
        return newData
    }

    //預約function
    async function addBooking() {
        const bookingPost = {
            memberId: currentUserId,
            courseId: getThisCourseId
        }
        const request = new Request("http://localhost:5000/api/courses/bookingData", {
            method: 'POST',
            body: JSON.stringify(bookingPost),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        await fetch(request)
        // getNumFromData()
        props.getBookingData()
        setChangeState(!changeState)
    }

    //抓該會員預約過的課程資料
    const thisUserCourseId = props.bookingData && props.bookingData.filter(i => i.memberId === currentUserId).map(p => p)

    //抓要取消的預約編號
    const thisCanceled = thisUserCourseId && thisUserCourseId.filter(i => i.courseId === getThisCourseId).map(p => p.courseBookingId)
    // console.log(thisUserCourseId)

    //取消預約
    async function userCancelBooking() {
        const updateBookingJson = {
            bookingState: 0
        }
        const request = new Request(`http://localhost:5000/api/courses/bookingData/${thisCanceled}`, {
            method: 'POST',
            body: JSON.stringify(updateBookingJson),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        await fetch(request)
        props.getBookingData()
        setChangeState2(!changeState2)
    }

    //取消預約後減少人數
    const getReduceNumFromData = useCallback(async()=>{
        const reduceNumJson = {
            courseId: getThisCourseId,
        }
        const req = new Request(`http://localhost:5000/api/courses/data`, {
            method: 'POST',
            body: JSON.stringify(reduceNumJson),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const res = await fetch(req)
        const newData = await res.json()
        // console.log(newData)
        return newData
    }, [getThisCourseId])
// console.log(currentUser.length)
    //確認預約視窗
    function myConfirmAddBooking(addBooking) {
        // let a = window.confirm("確定要預約此課程嗎?")
        if (currentUserId > 0) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'popupBtn confirmBtn',
                    cancelButton: 'popupBtn cancelBtn'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `預定課程：${props.course.courseName}`,
                html: `<h2>預定時間：${props.course.courseTime}</h2>`,
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonText: '確定預約',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'popupBtn confirmBtn',
                    cancelButton: 'popupBtn cancelBtn'
                }
            }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire(
                        '預約成功!',
                        '記得來上課喔～',
                        'success'
                    )
                    addBooking()
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        '太可惜了...',
                        '期待在其他課程與你相見',
                    )
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: '請先登入會員',
            }).then(() => {
                props.history.push('/login')
            })
        }
    }
    //確認取消視窗
    function myConfirmCancelBooking(userCancelBooking) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'popupBtn confirmBtn',
                cancelButton: 'popupBtn cancelBtn'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: `取消課程：${props.course.courseName}`,
            html: `<h2>課程時間：${props.course.courseTime}</h2><br />取消後無法再次預約，確定取消嗎？`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: '不取消了',
            confirmButtonText: '確定取消',
            reverseButtons: true,
            customClass: {
                confirmButton: 'popupBtn confirmBtn',
                cancelButton: 'popupBtn cancelBtn'
            }
        }).then((result) => {
            if (result.value) {
                swalWithBootstrapButtons.fire(
                    '取消成功!',
                    '期待在其他課程與你相見',
                    'success'
                )
                userCancelBooking()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    '太好了!',
                    '記得來上課喔～',
                )
            }
        })
    }

    //已額滿按鈕
    function displayFullBtn() {
        if (thisUserCourseId.filter(i => i.courseId === getThisCourseId).length === 0) {
            return (
                <>
                    <button value={props.value} className="fullBooking">已額滿</button>
                </>
            )
        } else {
            return (
                <>
                    <button value={props.value} className="alreadyBooked courseBtn" onClick={() => myConfirmCancelBooking(userCancelBooking)}>取消預約</button>
                </>
            )
        }
    }

    //課程彈跳視窗
    function showCJumpWindow() {
        Swal.fire({
            width: 700,
            title: props.course.courseName,
            imageUrl: props.course.courseImg,
            imageWidth: 400,
            imageHeight: 300,
            text: props.course.courseIntroduce,
        })
    }
    //教練彈跳視窗
    function showEJumpWindow() {
        Swal.fire({
            width: 700,
            title: props.course.Ename,
            imageUrl: props.course.Eimg,
            imageWidth: 400,
            html: `<h4>證照：</h4></br>${props.course.Elicense}<br/><br/><h4>專長：</h4></br>${props.course.Eexpertise}`,
        })
    }

    useEffect(() => {
        (async () => {
            const getNumFunc = await getAddNumFromData()
            setNum([getNumFunc.numberOfCourse])
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeState])

    useEffect(() => {
        (async () => {
            const getReduceNumFunc = await getReduceNumFromData()
            setNum([getReduceNumFunc.numberOfCourse])
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeState2])

    return (
        <>
            <Fade bottom>
                <div className="courseBox">
                    {getTimeInData <= nowTime ? <div className="courseBoxCover"></div> : ''}
                    <div className="courseName" onClick={() => showCJumpWindow()}>{props.course.courseName}</div>
                    <div className="courseTime">{newT}</div>
                    <div onClick={() => showEJumpWindow()} className="coachName">
                        {props.course.Ename}
                    </div>
                    <div>{num.map(i => (i))}/{props.course.courseQuoda}</div>
                    <div>
                        {+props.course.numberOfCourse >= +props.course.courseQuoda ? displayFullBtn() :
                            <CourseBookingButton
                                value={props.value}
                                bookingData={props.bookingData}
                                addBooking={addBooking}
                                userCancelBooking={userCancelBooking}
                                myConfirmAddBooking={myConfirmAddBooking}
                                myConfirmCancelBooking={myConfirmCancelBooking}
                                thisUserBookingId={props.thisUserBookingId}
                            />
                        }
                    </div>
                </div>
            </Fade>
        </>
    );
}

//---------------
const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelect,
});
export default withRouter(connect(mapStateToProps)(CourseBox));
  //---------------


