import React from 'react'
import './CourseInformation.scss'

function CourseInformation(props) {

  const { choose, newCategory } = props

  // console.log(choose.coursesCategory)
  // console.log(newCategory)

  const newTitle = choose.coursesCategory && choose.coursesCategory.filter(category => (category.courseCategoryName === newCategory)).map(item => (item.courseCategoryName))

  const newIntroduce = choose.coursesCategory && choose.coursesCategory.filter(category => (category.courseCategoryName === newCategory)).map(item => (item.categoryIntroduce))

  return (
    <>
      <div className="information">
        <p className="courseCategoryTitle">{newTitle}</p>
        <hr />
        <p className="introduce">
          {newIntroduce}
        </p>
      </div>
    </>
  )
}

export default CourseInformation 