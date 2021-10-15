import React, { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import ArticleLogo from "./ArticleLogo.jpg";

import "./ArticlesAdd.scss"
import axios from "axios";
import Swal from 'sweetalert2'


import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"

function ArticlesAdd(props) {
  const { currentUserData } = props
  //該使用者的id
  const currentUserId = currentUserData ? currentUserData.id : ''
  const currentUserImg = currentUserData ? currentUserData.memberImg : ''
  const currentUserNickname = currentUserData ? currentUserData.memberNickname : ''



  const [memberId] = useState(currentUserId);
  const [memberName] = useState("");
  // const [articleId, setArticleId] = useState();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tagName1, setTagName1] = useState("");
  const [tagName2, setTagName2] = useState("");
  const [memberImg] = useState("");
  const [articleImages, setArticleImages] = useState(ArticleLogo);
  const [avatarFile, setAvatarFile] = useState("");

  //圖片上傳後轉base64存進資料庫
  const handleImgChange = (event) => {
    let input = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setArticleImages(dataURL)
    };
    reader.readAsDataURL(input);
  };

  //上傳圖片 即時顯示

  const handleImgDisplay = (event) => {

    setAvatarFile(URL.createObjectURL(event.target.files[0]));

    setArticleImages(event.target.files[0]);
  };

  async function addArticleToSever(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    // console.log(item);
    axios.post(`http://localhost:5000/api/articles/add`, {
      method: "POST",
      credentials: "include", // 需傳送 Cookie 必須開啟
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      data: {
        memberId: item.memberId,
        memberName: item.memberName,
        // articleId: item.articleId,
        articleTitle: item.articleTitle,
        categoryName: item.categoryName,
        articleContent: item.articleContent,
        tagName1: item.tagName1,
        tagName2: item.tagName2,
        articleImages: item.articleImages,
        memberImg: item.memberImg,
      },
    });
  }


  return (
    <>
      <div className="article-add-container">

        <div className="article-add-left">

          <div className="article-member-add">
            <img
              className="article-member-avatar"
              src={currentUserImg} alt=""
            >
            </img>
            <h2>{currentUserNickname}</h2>
          </div>

          <h2>發表類別</h2>
          <select
            className="articleAddSelect"
            value={categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value);
            }}
          >
            <option>重訓技巧</option>
            <option>體脂控制</option>
            <option>健康飲食</option>
            <option>提升免疫力</option>
            <option>減肥</option>
          </select>
          <h2>輸入標籤</h2>
          <input
            name="articleAddTagName1"
            type="text"
            placeholder="輸入標籤"
            value={tagName1}
            className="articleAddTagName1"
            onChange={(event) => setTagName1(event.target.value)}
          />

          <input
            name="articleAddTagName2"
            type="text"
            placeholder="輸入標籤"
            value={tagName2}
            className="articleAddTagName2"
            onChange={(event) => setTagName2(event.target.value)}
          />
          <h2>上傳檔案</h2>
          <input
            name="addImg"
            className="articleFile"
            type="file"
            accept=".jpg,.png,jpeg"
            onChange={(event) => {
              handleImgChange(event);
              handleImgDisplay(event);
            }}
          />
          <div className="articleAddImgBox">
            <img className="articleAddImg" src={avatarFile ? avatarFile : articleImages} alt="" />
          </div>

        </div>
        <div className="article-add-right">

          <h2>標題</h2>
          <input
            type="text"
            name="articleTitle"
            value={articleTitle}
            placeholder="請輸入標題"
            className="articleAddInputTitle"
            onChange={(event) => setArticleTitle(event.target.value)}
          />

          <h2>內容</h2>
          <textarea
            name="addContent"
            className="articleAddContent"
            value={articleContent}
            placeholder="請輸入內文"
            onChange={(event) => setArticleContent(event.target.value)}
          />

        </div>
        <div className="article-add-footer">
          <button onClick={(e) => { props.history.push("/articles") }} className="articleAddCancle" type="button">
            取消
          </button>
          <button
            className=" articleAddSubmit"
            type="button"
            onClick={() => {
              Swal.fire({
                title: '新增文章',
                text: "確認欄位是否已填寫!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定',
                cancelButtonText:'取消'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    '完成!',
                    '已新增文章至討論區囉!!',
                    'success'
                  ).then(()=>{
                    if (result.value){
                      props.history.push("/articles")
                    }
                  })
                  addArticleToSever({
                    // articleId,
                    memberId,
                    memberName,
                    articleTitle,
                    categoryName,
                    articleContent,
                    tagName1,
                    tagName2,
                    articleImages,
                    memberImg,
                  });
                 
                }
              })

            }}
          >
            發佈
          </button>
        </div>


      </div>



    </>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});
export default withRouter(connect(mapStateToProps)(ArticlesAdd));