import React from 'react'
import './CoachBox.scss'
import Swal from "sweetalert2";


function CoachBox(props) {

    // const [sModalShow, setSModalShow] = useState(false);
 //教練彈跳視窗
 function showEJumpWindow() {
    Swal.fire({
        width: 700,
        title: props.employee.Ename,
        imageUrl: props.employee.Eimg,
        imageWidth: 400,
        html: `<h4>證照：</h4></br>${props.employee.Elicense}<br/><br/><h4>專長：</h4></br>${props.employee.Eexpertise}`,
        // imageHeight: 300,
        // background: '#fff url(props.course.courseImg)',
    })
}

    return (
        <>
            <div className="coachBoxFront">
            <img 
            onClick={() => showEJumpWindow()}
            src={props.employee.Eimg}
            alt="coachPhoto"
            />
                <div className="nameShadow" onClick={() => showEJumpWindow()}>
                    {props.employee.Ename}
                </div>
            </div>
        </>
    )
}

export default CoachBox