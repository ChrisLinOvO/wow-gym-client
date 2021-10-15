import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./EmployeeCenterPage.scss";
import { withRouter } from "react-router";
import Moment from "react-moment";
import "moment-timezone";

import CourseButton from "../../component/employee-center-course-button/EmployeeCenterCourseButton";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

function EmployeeCenter({ currentEmployee }) {
  const [employeedata, setEmployeedata] = useState([]);
  const [coursedata, setCoursedata] = useState([]);

  async function getEmployeeId() {
    // console.log(currentEmployee);
    const request = new Request(
      `http://localhost:5000/api/employee/${currentEmployee.Eid}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    setEmployeedata(data);
  }

  async function getCourse() {
    const request = new Request(
      `http://localhost:5000/api/employeecenter/${currentEmployee.Eid}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    setCoursedata(data);
  }

  //載入
  useEffect(() => {
    getEmployeeId();
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //改變
  useEffect(() => {
    setEmployeedata(employeedata);
  }, [employeedata]);

  useEffect(() => {
    setCoursedata(coursedata);
    // console.log(coursedata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursedata]);

  const employeeCapital = employeedata.map((item) => {
    return (
      <>
        <p className="data">姓名：{item.Ename}</p>
        <p className="data">性別：{item.Egender}</p>
        <p className="data">
          生日：<Moment format="YYYY/MM/DD">{item.Ebirthday}</Moment>
        </p>
        <p className="data">電話：{item.EphoneNumber}</p>
        <p className="data">email：{item.Eemail}</p>
      </>
    );
  });

  const employeeRecord = employeedata.map((item) => {
    return (
      <>
        <h1 className="license-title">專長：</h1>
        <p className="license">{item.Elicense}</p>
        <h1 className="license-title">證照：</h1>
        <p className="license">{item.Eexpertise}</p>
      </>
    );
  });

  const course = coursedata.map((item, index) => {
    return (
      <>
        <div className="course" key={index}>
          <div className="course-container-img">
            <img className="course-img" alt="" src={item.courseImg} />
          </div>
          <h3 className="coursename">{item.courseName}</h3>
          <div>
            <Moment format="YYYY-MM-DD HH:mm">{item.courseTime}</Moment>
          </div>
          <CourseButton itemID={item.courseId} />
        </div>
      </>
    );
  });

  return (
    <>
      <div className="employeeCenterPage">
        <div className="center-box">
          <div className="center-top">
            <div className="centertop-box">
                <figcaption className="centerpeople-box-top">
                  <img
                    className="people-top"
                    alt=""
                    src={currentEmployee.Eimg}
                  />
                  <figure className="centerpeople-content-top">
                    <h1 className="top-title">{currentEmployee.Ename}</h1>
                  </figure>
                </figcaption>
              <button
                className="addcourse"
                onClick={() => {
                  window.location.replace("http://localhost:3000/employeeform");
                }}
              >
                課程上傳
              </button>
            </div>
          </div>
          <div className="box">
            <div className="left">
              <div className="left-box">{course}</div>
            </div>
            <div className="right">
              <figcaption className="people-box-right">
                <img
                  className="people-right"
                  alt=""
                  src={currentEmployee.Eimg}
                />
                <figure className="people-content-right">
                  <h1 className="right-title">{currentEmployee.Ename} 教練</h1>
                </figure>
              </figcaption>
              <div className="data-box">
                <div className="data">{employeeCapital}</div>
                <div className="expertise">{employeeRecord}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeCenter));