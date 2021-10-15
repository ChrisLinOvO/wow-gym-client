import React, { useState, useEffect } from "react";
import "./Courses.scss";
import CourseInformation from "../../component/course-information/CourseInformation"
import CourseSelector from "../../component/course-selector/CourseSelector";
import CourseCalender from "../../component/course-calender/CourseCalender";
// import WeekBar from "../../component/week-bar/WeekBar"

//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
// import Footer from "../../component/footer/Footer";
//---------------


function Courses(props) {

  const [allCourses, setAllCourses] = useState([])
  const [choose, setChoose] = useState([])
  const [newCourses, setNewCourses] = useState([])
  const [newCategory, setNewCategory] = useState([])
  // //原本資料庫的bookingData
  const [bookingData, setBookingData] = useState('');

  //---------------
  const { currentUser } = props
  //該使用者的id
  const currentUserId = currentUser ? currentUser.id : ''
  //---------------


  async function getCoursesData() {

    const response = await fetch("http://localhost:5000/api/courses/data");
    const data = await response.json();
    setAllCourses(data)

  }

  async function getCategoryData() {
    // 開啟載入指示
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/category", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setChoose(data);
  }
  // //Fetch 預約資料

  async function getBookingData() {
    const request = new Request("http://localhost:5000/api/courses/bookingData", {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setBookingData(data)

  }
  const handleChange = (e) => {

    const oop = e.target.value
    const renewCourses = allCourses.coursesRow && allCourses.coursesRow.filter(course => (course.courseCategoryName === oop))

    setNewCourses(renewCourses)
    setNewCategory(oop)

    // console.log('aa',{ ...choose })
    if (!allCourses.coursesRow) {
      const aa = { ...choose }
      setChoose(aa)
    }
  }

  useEffect(() => {
    getCoursesData()
    getCategoryData()
    getBookingData()
    handleChange({ target: { value: '請選擇課程種類' } })

  }, [])

  return (
    <>
      <div className="coursesWrapper">
        <div className="coursesContainer">
          <div className="courseBannerContainer">
            <div className="courseBanner">
            </div>
            <h1 className="categoryTitle">課程資訊 Class information</h1>
          </div>
          <div className="container">
            <CourseInformation
              choose={choose}
              newCourses={newCourses}
              newCategory={newCategory}
            />
            <CourseSelector
              choose={choose}
              handleChange={handleChange}
            />
            <div>
              <CourseCalender
                newCourses={newCourses}
                bookingData={bookingData}
                getBookingData={getBookingData}
                currentUserId={currentUserId}
                getCoursesData={getCoursesData}
                setNewCourses={setNewCourses}
              />
            </div>
          </div>
          <div style={{ height: "2rem" }} />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
//---------------
const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(Courses));
//---------------
