import React, { useState, useEffect } from 'react'
import FaqListItem from './FaqListItem'
import './FaqList.scss'
// import FaqImg from '../Faq_list/img/faqimg.jpg'
import FaqImg  from './img/faqimg3.jpg';


const FaqList = (props) => {
    const [faqData, setFaqData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filterData, setFilterData] = useState([])
    const [filterButton,setFilterButton] = useState('')
    // 預設分類為 "常見問題"
    const [btnActive,setBtnActive] = useState('常見問題')


     // 切換分類
     const changeKind = (e) => {
        setFilterButton(e.target.name)
        setBtnActive(e.target.name)
    }
    // 搜尋
    const doDataSearch = () => {
        // console.log(faqData);
        let changeFilterData = faqData.filter(item =>
            searchValue !== '' ? item.faqtitle.toUpperCase().includes(searchValue) : item.faqkindname === '常見問題')
        setFilterData(changeFilterData)
    }
    const changeSearch = (e) => {
        setSearchValue(e.target.value.toUpperCase())
    }
    const getData = async () => {
        const request = new Request('http://localhost:5000/api/customerRoutes/faqlist', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            })
        })
        const res = await fetch(request)
        const data = await res.json()
        setFaqData(data)
        return data;
    }
    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, [])
    //  初始執行。

    useEffect(() => {
        const changeFilterData = faqData.filter(item => item.faqkindname === '常見問題')
        setFilterData(changeFilterData)
    }, [faqData])
    // 初始執行後，faqData變化後，執行。

    useEffect(() => {

         // 切換分類後換資料
    const DoFilterData = () => {
        let changeFilterData = faqData.filter(item => item.faqkindname === filterButton)
        setFilterData(changeFilterData)
    }
        DoFilterData()
    }, [filterButton])
    // onclick，filterButton的state變化後，執行。

    useEffect(() => {
        doDataSearch()
    }, [searchValue])
    // onChange，changeSearch的state變化後，執行。

   
    return (
        <>
            <div className="faq-list-img-box">
            <img className="faq-list-img" src={FaqImg}  >
            </img>
            </div>
            <div className="btn-box">
                <button className={`${btnActive==="常見問題" ? "font-color-blue" :""} kindBtn`} name="常見問題" onClick={e => changeKind(e)}>常見問題</button>
                <button className={`${btnActive==="課程問題" ? "font-color-blue" :""} kindBtn`} name="課程問題" onClick={e => changeKind(e)}>課程問題</button>
                <button className={`${btnActive==="教練問題" ? "font-color-blue" :""} kindBtn`} name="教練問題" onClick={e => changeKind(e)}>教練問題</button>
                <button className={`${btnActive==="意見反映" ? "font-color-blue" :""} kindBtn`} name="意見反映" onClick={e => changeKind(e)}>意見反映</button>
            </div>

            <input className="search-input" onChange={e => changeSearch(e)} placeholder="搜尋相關問題"></input>
            <div className="faq-box">
                {filterData instanceof Array && filterData.length > 0 ?
                    <>
                        {filterData.map((item, index) =>
                            <FaqListItem key={index}{...item}>
                            </FaqListItem>)}
                    </>
                    : <div>
                    <h2>搜尋不到資料，請重新搜尋。</h2>
                    </div>
                }
            </div>
        </>
    )
}
export default FaqList;
