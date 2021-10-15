import React from 'react'
import './CoachList.scss'
import CoachBox from '../Coach-box/CoachBox'


function CoachList(props) {
    // console.log(props)
    return (
        <>
            <div className="coachList">
                {props.employee && props.employee.map(employee => (
                    <CoachBox key={employee.Eid} employee={employee} />
                ))}
            </div>
        </>
    )
}

export default CoachList