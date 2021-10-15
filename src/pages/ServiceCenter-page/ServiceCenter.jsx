import React, { useState } from 'react'
import ServiceCreate from '../../component/ServiceCreate/ServiceCreate'
import ServiceRecord from '../../component/ServiceRecord/ServiceRecord'
import FaqList from '../../component/Faq_list/FaqList'
// import '../component/ServiceNav/ServiceNav.scss'
import './ServiceCenter.scss'
import { MdKeyboardArrowRight } from "react-icons/md"
import Swal from 'sweetalert2'

//---------------1
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------
const ServiceCenter = (props) => {
    const [nav, setNav] = useState('常見問題')
    // 改變state後，用state內的字串，去改變component。
    // const []
    //---------------2
    const { currentUserData,history } = props
    console.log(currentUserData);
    //該使用者的id
    //  const currentUserId = currentUserData ? currentUserData.id : ''
    //---------------
    const handleChange = (i) => {
        setNav(i)
        console.log(i);
    } 
    
    const checkHasLogin = (e) => {
        // id>0 ? setNav(e) : history.push('/login')
        if(id>0){
            setNav(e) 
        }else {
            Swal.fire("請先登入!") && setTimeout(() => { history.push('/login') }, 2000)
        }
        // if(id>0){ 
        //     //判斷undefined或空值或空字串，改用數字判斷
        //     console.log(id)
        //     setNav('問題回報線上表單') 
        // }
        // else{
        //    console.log('去登入') 
        //     window.history.push('/login')
        // }
    }
    
    const {id} = {...currentUserData}
    console.log(id);
    return (
        <div className="service-page">
            {/* <Header /> */}
            <div className="service-left-body">
                <h1 href="./home.html" className="home-title" value="常見問題" onClick={() => setNav('常見問題')}>客服中心</h1>
                <div className="nav-box">
                    <button className="nav-button"  value="常見問題" onClick={() => setNav('常見問題')}>常見問題ＦＡＱ
                    <MdKeyboardArrowRight className="question-icon" />
                    </button>
                    {id===1 ?'':<button className="nav-button" value="問題回報線上表單" onClick={e => checkHasLogin(e.target.value)}>問題回報線上表單<MdKeyboardArrowRight className="service-icon" />
                    </button>}
                    <button className="nav-button" value="回報紀錄列表" onClick={e => checkHasLogin(e.target.value)}>回報紀錄列表<MdKeyboardArrowRight className="service-list-icon" />
                        {/* onclick後，變更state的字串。 */}
                    </button>
                </div>
            </div>
            <div className="service-right-body">
                {nav === '常見問題' && <FaqList />}
                {nav === '問題回報線上表單' && <ServiceCreate onClick={handleChange} currentUserData={currentUserData} history={history}/>}
                {nav === '回報紀錄列表' && <ServiceRecord currentUserData={currentUserData} />}
                {/* 依照state的字串，去顯示component */}
            </div>
        <div style={{height: "2rem"}} />
            {/* <Footer /> */}
        </div>

    )
}

//---------------
const mapStateToProps = createStructuredSelector({
    currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(ServiceCenter));
  //---------------