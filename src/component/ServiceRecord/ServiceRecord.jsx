import React, { useEffect, useState } from 'react'
import NewServiceRecordDetail from '../ServiceRecordDetail/NewServiceRecordDetail'
import './ServiceRecord.scss'

const ServiceRecord = (props) => {
    const [AllData, setAllData] = useState([])
    const currentUserData = props.currentUserData
    const {id} = {...currentUserData}
    // console.log(currentUserData);
    // console.log(id);
    // 取回報紀錄列表
    async function getData() {
        const request = new Request('http://localhost:5000/api/customerRoutes/', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            })
        })
        const res = await fetch(request)
        const data = await res.json()
        // 設定資料
        // console.log("data", data, "id", id)
        // console.log(data.filter(data => id === data.memberid))
        // setAllData((data => data.memberid===1? :memberId === data.memberid))
        setAllData(id === 1 ? data : data.filter(data => id === data.memberid))
    }
    // console.log(AllData);
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="ServiceRecord">
                <h3 className="service-list-title"><span className="h3-span">問題回報</span><span>紀錄列表</span></h3>
                <span className="service-list-title-box">
                    <div className="number">單號</div>
                    <div className="user-id">會員編號</div>
                    <div className="user-name">姓名</div>
                    <div className="complaint-title">問題主旨</div>
                    <div className="phone-number">連絡電話</div>
                    <div className="e-mail">E-mail</div>
                    <div className="QA-body">問答對話</div>
                    <div className="create-time">建立時間</div>
                </span>
            </div>
            {AllData.length > 0 ?
             AllData.map((item, index) =>
                <NewServiceRecordDetail number={index + 1} key={index}{...item} currentUserData={currentUserData} >
                </NewServiceRecordDetail>
            ):
            <div className="border-button"></div>} 
            
        </>
    )
}

export default ServiceRecord;