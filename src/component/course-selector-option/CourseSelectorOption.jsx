import React from 'react'
import './CourseSelectorOption.scss'


function SelectorOption(props) {
// console.log('so:'+props)
    return (
        <>  
            <option value={props.option.courseCategoryName}>
            {props.option.courseCategoryName}</option>
        </>
    )
}

export default SelectorOption