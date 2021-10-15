import React, { useState } from 'react'
import "./FaqListItem.scss"
import { FiChevronDown, FiChevronRight } from "react-icons/fi";


const FaqListItem = (props) => {
    const [showFaq, setShowFaq] = useState(false)

    const handleClick = () => {
        setShowFaq(!showFaq)
    }
    // const showtime = (value) => {
    //     return props.createtime.substr(0, 10)
    // }
    return (
        <>
            <div className="faq-title-box" onClick={handleClick}>
                {/* <div className="faq-id">No.{props.faqid}</div> */}
                <div type="checkbox" className="faq-title">{props.faqtitle}</div>
        
                <FiChevronRight className={`${showFaq ?
                    "faq-title-icon-1st"
                    :
                    "faq-title-icon-2nd"}`}  />
            </div>

            <div className={showFaq ?
                "faq-body-box faq-active"
                :
                "faq-body-box"}>
                <div className="faq-body" >{props.faqbody}
                </div>
                {/* <div>{showtime(props.createtime)}</div> */}
            </div>

            {/* <input type="checkbox" id="chck1" />
            <div className="faq-body-box" for="chck1" onClick={handleClick}>{props.faqtitle}</div>

            {showFaq ?
                <div className="tab-content">  {props.faqbody}
                    <div className="faq-body-box">
                        <div className="faq-body">{props.faqbody}</div><div>{showtime(props.createtime)}</div>
                    </div>
                </div> :
                ""} */}
        </>
    )
}

export default FaqListItem;