import React from "react"
import { Link, withRouter } from "react-router-dom"
import axios from "axios"
import Moment from "react-moment"

import "./ArticleCard.scss"
import { AiFillLike } from "react-icons/ai"
import Fade from 'react-reveal/Fade';


const ArticleCard = (props) => {
  const { text, allArticles, setAllArticles } = props

  //取得個別文章資料
  function handleClick(articleId) {
    const result = axios.get(
      `http://localhost:5000/api/articles/${articleId}`,
      {
        method: "GET",
        credentials: "include", // 需傳送 Cookie 必須開啟
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        data: {},
      }
    );
    setAllArticles(result)
  }


  //類別篩選

  let filterArticles = allArticles.filter((item) => {
    return (item.categoryName.indexOf(text) && item.tagName1.indexOf(text) && item.tagName2.indexOf(text)) !== -1;
  });


  return (
    <>

      <div className="masonry">
        {filterArticles
          ? filterArticles.map((list, index) => (
            <div className="item" key={index}>
              <Fade bottom>
                <Link to={"/articles/" + list.articleId}>
                  <div className="card-container" >
                  <div className="card-img-box">
                    <img className="card-img" src={list.articleImages} alt="" ></img></div>
                    <div className="card-body">
                      <div className="card-body-top">
                        <img className="member-avatar" src={list.memberImg} alt=""></img>
                        <div className="membar-info">
                          <h4>{list.memberNickname}</h4>
                          <Moment className="homeTime" format="YYYY-MM-DD HH:mm">{list.created_at}</Moment>
                        </div>
                      </div>

                      <div className="card-body-mid">

                        <h4
                          className="articleTitle"
                          onClick={() => {
                            handleClick(list.articleId);
                            // console.log(v.articleId);
                          }}
                        >
                          {list.articleTitle}
                        </h4>

                        <div className="article-top-line"></div>
                        <div className="card-category">
                          <div className="card-category-parent">
                            {list.categoryName}
                          </div>
                        </div>
                        <div className="articleContent">{list.articleContent}</div>

                        <div className="card-tag">
                          <div className="card-tag1">{list.tagName1}</div>
                          <div className="card-tag2">{list.tagName2}</div>
                        </div>
                      </div>
                      <div className="article-under-line"></div>
                      <div className="card-body-under">
                        <div className="card-like">
                          <div className="article-card-icon">
                            <AiFillLike />
                          </div>
                          <p>{list.articleLike}</p>
                        </div>
                        <div className="card-comment">
                          <p>留言</p>
                          <p>{list.COUNT}</p>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </Link>
              </Fade>
            </div>
          ))
          : ""}
      </div>
    </>
  );
};
export default withRouter(ArticleCard)