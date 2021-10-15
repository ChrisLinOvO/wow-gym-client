import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

import EmployeeCentetModal from "../employee-center-modal/employeeCentetModal";

function CourseButton({ currentEmployee, itemID,history }) {
  const [modashow, setModashow] = useState(false);
  const [courseid, setCourseid] = useState("");
  // const [test,settest]=useState("");
  //取得
 

  //刪除
  async function handleDelete() {
      const request = new Request(
        `http://localhost:5000/api/courses/${itemID}`,
        {
          method: "DELETE",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        }
      );

      await fetch(request);
      //  settest(Math.random()*222)
      window.location.reload();
  }

  //載入
  useEffect(() => {
    const getCourseID = async()=> {
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
      setCourseid(data);
    }
    getCourseID();
  }, [currentEmployee.Eid]);

  //改變
  useEffect(() => {
    setCourseid(courseid);
  }, [courseid]);

  return (
    <>
      <button
        type="button"
        className="course-edit"
        onClick={() => {
          setModashow(true);
        }}
      >
        <FaEdit />
      </button>
      <button
        type="button"
        className="course-delete"
        onClick={() => {
          Swal.fire({
                    title: '刪除課程',
                    text: "確認課程是否刪除!",
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
                        '已刪除課程!!',
                        'success'
                      )
                      handleDelete();
                    
                    }
                  })
          
        }}
      >
        <FaTrashAlt />
      </button>
      {modashow && (
        <EmployeeCentetModal
          modashow={modashow}
          setModashow={setModashow}
          itemID={itemID}
          courseid={courseid}
          setCourseid={setCourseid}
        />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(CourseButton));