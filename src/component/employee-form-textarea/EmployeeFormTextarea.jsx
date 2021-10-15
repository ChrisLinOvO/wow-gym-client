import React from 'react'
import './EmployeeFormTextarea.scss'

function MyTextarea(props) {
    const {value, onChange, title, placeholder, required} =props
    // console.log(props)
  return (
    <>
      <label className="label textarea-label" htmlFor="">
        {title}
        <textarea className="textarea" placeholder={placeholder} value={value} onChange={onChange} required={required}></textarea>
      </label>
    </>
  )
}
export default MyTextarea