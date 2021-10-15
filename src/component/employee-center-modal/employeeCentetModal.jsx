import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./employeeCentetModal.scss";
import moment from "moment";
import Swal from 'sweetalert2';

import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

function EmployeeCentetModal({
  currentEmployee,
  setModashow,
  itemID,
  courseid,
}) {
  const [courseName, setCourseName] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [courseHour, setCourseHour] = useState("");
  const [courseQuoda, setCourseQuoda] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [courseImg, setCourseImg] = useState("");

  const courseData = courseid.filter((item) => {
    return item.courseId === itemID;
  });

  const courseValue = courseData.map((item) => {
    return (
      <>
        <label className="label-content">
          課程名稱：
          <input
            className="input-content"
            type="text"
            defaultValue={item.courseName}
            onChange={(event) => {
              setCourseName(event.target.value);
            }}
          />
        </label>
        <label className="label-content">
          開課時間：
          <input
            className="input-content"
            type="text"
            defaultValue={moment(item.courseTime).format("YYYY-MM-DD HH:mm")}
            onChange={(event) => {
              setCourseTime(event.target.value);
            }}
          />
        </label>
        <label className="label-content">
          課程時數：
          <input
            className="input-content"
            type="number"
            defaultValue={item.courseHour}
            onChange={(event) => {
              setCourseHour(event.target.value);
            }}
          />
        </label>
        <label className="label-content">
          人數上限：
          <input
            className="input-content"
            type="number"
            defaultValue={item.courseQuoda}
            onChange={(event) => {
              setCourseQuoda(event.target.value);
            }}
          />
        </label>
        <label className="label-content">
          課程分類：
          <input
            className="input-content"
            type="text"
            defaultValue={item.categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value);
            }}
          />
        </label>
        <label className="label-content">
          課程圖片：
          <input
            className="input-content"
            type="file"
            accept=".jpg,.png"
            onChange={(event) => {
              let input = event.target.files[0];
              let reader = new FileReader();
              reader.onload = function () {
                let dataURL = reader.result;
                setCourseImg(dataURL);
              };
              reader.readAsDataURL(input);
            }}
          />
        </label>
      </>
    );
  });

  //req.body
  async function updataCourse() {
      const row = {
        courseId: itemID,
        staffId: currentEmployee.Eid,
        categoryName: categoryName,
        courseName: courseName,
        courseTime: courseTime,
        courseHour: courseHour,
        courseQuoda: courseQuoda,
        courseImg: courseImg,
      };

      //編輯
      const request = new Request(
        `http://localhost:5000/api/courses/${itemID}`,
        {
          method: "POST",
          body: JSON.stringify(row),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        }
      );

      const response = await fetch(request);
      await response.json();

      // console.log("伺服器回傳的json資料", data);
      window.location.reload();
  }

  //載入
  useEffect(() => {
    courseData.forEach((element) => {
      setCourseName(element.courseName);
      setCourseTime(moment(element.courseTime).format("YYYY-MM-DD HH:mm"));
      setCourseHour(element.courseHour);
      setCourseQuoda(element.courseQuoda);
      setCategoryName(element.categoryName);
      setCourseImg(element.courseImg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-box">
      <header className="modal-header">
        <h1 className="modal-title">課程編輯</h1>
      </header>
      <article className="modal-body">{courseValue}</article>
      <footer className="modal-footer">
        <button
          className="modal-edit"
          onClick={() => {
            Swal.fire({
                    title: '編輯課程',
                    text: "確認課程是否編輯!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '確定',
                    cancelButtonText: '取消'
                  }).then((result) => {
                    if (result.value) {
                      Swal.fire(
                        '完成!',
                        '已編輯課程!!',
                        'success'
                      )
                      updataCourse();
                    
                    }
                  })
          }}
        >
          儲存並修改
        </button>
        <button
          className="modal-del"
          onClick={() => {
            setModashow(false);
          }}
        >
          關閉視窗
        </button>
      </footer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeCentetModal));
