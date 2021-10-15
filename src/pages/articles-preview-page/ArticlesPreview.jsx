import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import axios from "axios"
import "./ArticlesPreview.scss"
import Moment from "react-moment"
import { AiOutlineLike } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"


import { createStructuredSelector } from "reselect"
import { currentUserSelect } from "../../redux/user/user-selector"


const ArticlesPreview = (props) => {

  const { currentUserData } = props
  //該使用者的id
  const currentUserId = currentUserData ? currentUserData.id : ''
  // console.log(currentUserId)

  const currentUserImg = currentUserData ? currentUserData.memberImg : ''
  // const currentUserNickname = currentUserData ? currentUserData.memberNickname : ''
  // const currentUserNickname = currentUserData ? currentUserData.memberNickname : ''
  const currentUserName = currentUserData ? currentUserData.memberName : ''
  // console.log(currentUserImg)




  const [Data, setData] = useState()
  console.log(Data)
  const [articleId, setArticleId] = useState("")
  const [memberId,setMemberId] = useState(currentUserId)
  const [memberName,setmemberName] = useState("")
  // const [memberNickname, setMemberNickname] = useState("")
  const [content, setContent] = useState("")
  const [memberImg,setMemberImg] = useState("")
  const [comments, setComments] = useState("")
  const [text, setText] = useState("")
  const [commentsNum, setCommentsNum] = useState("")
  const [articleLike, setArticleLike] = useState("")
  const [active,setActive] = useState("")

  useEffect(() => {
    setMemberImg(currentUserImg)
    setmemberName(currentUserName)
    setMemberId(currentUserId)
  },[currentUserImg,currentUserName,currentUserId])
  //取得文章資料
  useEffect(() => {
    const FetchData = async (id) => {
      const result = await axios(`http://localhost:5000/api/articles/${id}`);
      setData(result.data);
      console.log(result.data)
    };
    FetchData(props.match.params.articleId);
  }, [props.match.params.articleId, articleLike])


  // console.log(props.match.params.articleId)
  //傳送留言
  async function addToSever(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    console.log(item);
    const commentspost = axios.post(
      `http://localhost:5000/api/articles/postComments/:articleId`,
      {
        method: "POST",
        credentials: "include", // 需傳送 Cookie 必須開啟
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        data: {
          articleId: item.articleId,
          memberId: item.memberId,
          memberName: item.memberName,
          content: item.content,
          memberImg: item.memberImg,
       
        },
      },
      // window.location.reload()
    );
    setText(commentspost)
    setContent("")
  }


  //取得留言
  async function getAddCommentsData() {
    const request = new Request(
      `http://localhost:5000/api/articles/getComments/${props.match.params.articleId}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    // 設定資料
    setComments(data);
 
  }
  useEffect(() => {
    getAddCommentsData();
  }, [text]);
  useEffect(() => {
    setArticleId(props.match.params.articleId);
  }, [articleId]);
  // console.log(props.match.params)

  // 取得留言數
  async function getCommentsNumber() {
    const request = new Request(
      `http://localhost:5000/api/articles/getCommentsNumber/${props.match.params.articleId}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    setCommentsNum(data[0].COUNT);
  }

  useEffect(() => {
    // console.log(comments);
  }, [comments]);
  useEffect(() => {
    getCommentsNumber();
  }, [comments]);

  //更新點讚數

  async function postArticleLikeUpdate(articleId,flag) {
    // 注意資料格式要設定，伺服器才知道是json格式

    const articleLikeData = axios.post(
      `http://localhost:5000/api/articles/postArticleLikeUpdate`,
      {
        articleId: articleId,
        flag: flag
      });
    setArticleLike(articleLikeData)
  }



  return (
    <>
      {Data
        ? Data.map((list, index) => (
          <div className="articles-preview-container" key={index}>
            <div className="contentCard-container" >
              <div className="card-top">
                <div className="membar">
                  <img className="member-avatar" src={list.memberImg} alt=""></img>
                  <div className="membar-info">
                    <h4>{list.memberNickname}</h4>
                    <Moment format="YYYY-MM-DD HH:mm">
                      {list.created_at}
                    </Moment>
                  </div>
                </div>
              </div>
              <div className="card-body-mid">
                <h1>{list.articleTitle}</h1>
                <div className="card-category">
                  <div className="card-category-parent">
                    {list.categoryName}
                  </div>
                </div>
                <p>{list.articleContent}</p>
                <div className="previewImgBox">
                  <img className="previewImg" src={list.articleImages} alt="">
                  </img></div>
                <div className="card-tag">
                  <div className="card-tag1">{list.tagName1}</div>
                  <div className="card-tag2">{list.tagName2}</div>
                </div>
              </div>
              <div className="card-body-under">
                <div className="card-like">
                  <div className="article-preview-icon">
                    {list.flag !== 'Y' || (!active && active !=='Y')? 
                    <AiOutlineLike onClick={() => {
                      postArticleLikeUpdate(
                        articleId,
                        'Y'
                      );
                      setActive('Y');
                    }} />
                    :  <AiFillLike  onClick={() => {
                      postArticleLikeUpdate(
                        articleId,
                        'N'
                      );
                      setActive('N');
                    }}/>}
                  </div>
                  <p>{list.articleLike}</p>
                </div>
                <div className="card-comment">
                  <p>留言</p>
                  <p>{commentsNum}</p>
                </div>
                {/* <div className="card-watch">
                  <p>瀏覽人數</p>
                  <p>800</p>
                </div> */}
              </div>
              <div className="line"></div>

              <div className="ArticleContentCard">

                <div className="articleCommentCard">
                  <p>{commentsNum}則留言</p>
                  <div className="membar-comment">
                
                    <img className="member-avatar" src={currentUserImg} alt=""></img>
                    <div className="previewInputBox">
                      <input
                        className="previewInput"
                        type="text"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="分享你的留言" 
                      />

                      <button
                        className="previewBtn"
                        type="button"
                        onClick={() => {
                          addToSever({
                            content,
                            articleId,
                            memberId,
                            memberName,
                            memberImg,
                          });
                        }}
                      >
                        發佈
                      </button>
                    </div>
                  </div>
                  <p>熱門留言</p>
                  {comments
                    ? comments.map((list, index) => (
                      <div className="article-comment" key={index}>
                        <img
                          className="member-avatar-res"
                          src={list.memberImg} alt=""
                        ></img>
                        <div className="member-info">
                          <div className="info1">
                            <h5>{list.memberNickname}</h5>
                            <Moment className="time" format="YYYY-MM-DD HH:mm">
                              {list.created_at}
                            </Moment>
                          </div>
                          <div className="commentText">{list.content}</div>
                        </div>
                      </div>
                    ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        ))
        : ""}
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});
export default withRouter(connect(mapStateToProps)(ArticlesPreview))