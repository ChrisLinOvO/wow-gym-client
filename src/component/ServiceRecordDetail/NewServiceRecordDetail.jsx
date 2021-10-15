import React, { useState, useEffect } from 'react'
import { FiFileText } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./NewServiceRecordDetail.scss"
import Swal from 'sweetalert2'



const ServiceRecordDetail = (props) => {
    // console.log(props);

    const [replyData, setReplyData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    // 點擊後顯示對話欄
    const [userInput, setUserInput] = useState('')
    // 設定對話框
    const closeClick = () => { setShowAlert(!showAlert) }

    // 取對話資訊
    async function getReplyData() {
        const request = new Request('http://localhost:5000/api/customerRoutes/getreplylist', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            })
        })
        const res = await fetch(request)
        const data = await res.json()
        setReplyData(data)
        // 設定資料
        // console.log(data);
    }



    async function dataPost() {
        if (userInput === '') {
            Swal.fire("請輸入對話!")
        } else {
            const request = new Request('http://localhost:5000/api/customerRoutes/test', {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json', 'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    complaintid: props.complaintid,
                    responder: props.currentUserData.id,
                    replycontent: userInput
                },
                )
            })
            const res = await fetch(request)
            await res.json()
            // 設定資料
            setUserInput('')
            // POST後對話框清空
        }
    }



    // console.log(replyData);
    let Data = replyData.filter(item => item.complaintid === props.complaintid)

    useEffect(() => {
        getReplyData();
    }, [userInput])
    // 預設

    const showtime = (value) => {
        return props.createtime.substr(0, 10).concat(' ').concat(props.createtime.substr(11, 8))
    }

    const complaintTime = (value) => {
        return props.createtime.substr(11, 8)
    }

    const commentTime = (value) => {
        return value.substr(11, 8)
    }
    // console.log('replyData' , replyData);


    return (
        <>
            <div className="border-button"></div>
            <span className="list-box">
                <div className="number">{props.complaintid}</div>
                <div className="user-id">{props.memberid}</div>
                <div className="user-name">{props.name}</div>
                <div className="complaint-title">{props.complainttitle}</div>
                <div className="phone-number">{props.phonenumber}</div>
                <div className="e-mail">{props.email}</div>
                <div className="QA-body">
                    <button className="content-btn"
                        onClick={closeClick}>
                        <FiFileText className="content-icon" />
                    </button>
                </div>
                <div className="create-time">{showtime(props.createtime)}</div>
            </span>
            {showAlert ?
                <div className="reply-content-body show-modal">
                    <div className="reply-content-body-content">
                        <div className="button-box">
                            <button className="close-button"
                                onClick={closeClick}><AiOutlineCloseSquare />
                            </button>
                        </div>
                        <div className="history-body" >
                            <div>
                                {props.memberid === '1'
                                    ?
                                    <>
                                        <p className="history-admin">Admin:</p>
                                        <div className="history-right">
                                            {props.complainttextarea}
                                            <div className="reply-time">
                                                {complaintTime(props.createtime)}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className="history-member">Member:</p>
                                        <div className="history-left">{props.complainttextarea}
                                            <div className="reply-time">{complaintTime(props.createtime)}</div>
                                        </div>
                                    </>
                                }
                            </div>
                            {/* <div className="history-left">會員-{props.name}：{props.complainttextarea}</div> */}
                            {Data.map((item, index) =>
                                <div >
                                    {item.responder === '1' ?
                                        <div>
                                            <p className="history-admin">Admin:</p>
                                            <div className="history-right">
                                                {item.replycontent}
                                                <div className="reply-time">{commentTime(item.replytime)}</div>
                                            </div>
                                        </div>

                                        :
                                        <div>
                                            <p className="history-member">Member:</p>
                                            <div className="history-left">
                                                {item.replycontent}
                                                <div className="reply-time">{commentTime(item.replytime)}</div>
                                            </div>
                                        </div>

                                    }
                                </div>
                            )}
                        </div>
                        <div className="textarea-box">
                            <textarea value={userInput} className="textarea-body"
                                onChange={e => setUserInput(e.target.value)} maxlength="300" placeholder="請輸入.."
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        dataPost()
                                    }
                                }}>
                            </textarea>
                        </div>
                        <div className="testPost-btn">
                            <button
                                disabled={userInput === '' ? "disabled" : ""}
                                className="submit-btn"
                                onClick={dataPost}>送出
                        </button>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}
export default ServiceRecordDetail;