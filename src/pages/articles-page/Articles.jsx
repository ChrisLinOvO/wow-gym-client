import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom"
import "./Articles.scss"
import Swal from 'sweetalert2'
import { IoIosArrowDropupCircle } from "react-icons/io";
import ArticleCard from "../../component/article-card/ArticleCard"
import ArticlePopular from "../../component/article-popular/ArticlePopular"
import { userPath, currentUserSelect } from "../../redux/user/user-selector";

function Articles(props) {
// Go to top btn--------------
  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handlescroll = function () {
    if (((this.height = 1050), this.scrollY > this.height)) {
      document.getElementById("clickreturn").classList.add("show");
    } else {
      document.getElementById("clickreturn").classList.remove("show");
    }

  };

  const { currentUserData, userPath } = props


  console.log(userPath)

  //該使用者的id
  const currentUserId = currentUserData ? currentUserData.id : ''
  // console.log(currentUserId)
  const [allArticles, setAllArticles] = useState([])

  const [text, setText] = useState("")

  function handleClick(value) {
    setText(value);
  }

  //取得文章列表資料
  async function getData() {
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/articles", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
    // 設定資料
    setAllArticles(data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (

    <>
      <div className="articles-container">
      <a id="clickreturn" href="javascript:window.scrollTo(0, 0);">
          <IoIosArrowDropupCircle />
        </a>
        <div className="articleCategory">
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("");
            }}
          >
            全部
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("重訓技巧");
            }}
          >
            重訓技巧
          </button>

          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("體脂控制");
            }}
          >
            體脂控制
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("健康飲食");
            }}
          >
            健康飲食
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("提升免疫力");
            }}
          >
            提升免疫力
          </button>
          <button
            className="articleCategoryButton"
            onClick={() => {
              handleClick("減肥");
            }}
          >
            減肥
          </button>
        </div>






        <div className="articleHomePageAdd">
          <button className="articleHomePageAdd-btn"
            onClick={() => {


              if (currentUserId) {
                props.history.push("/articlesAdd")
              } else {
                Swal.fire('請登入會員喔!!').then((result) => {
                  if (result.value) {
                    props.history.push("/login", {           
                    })
                  }
                })
              }

            }}>發表文章</button>
        </div>

        <div className="article-page">
          <div className="article-container-left">
            <ArticleCard
              text={text}
              allArticles={allArticles}
              setAllArticles={setAllArticles}
            />
          </div>
          <div className="article-container-right">
            <div className="article-popular-top">人氣文章排行</div>
            <div className="article-popular-list">
              <ArticlePopular />
            </div>
            <div className="article-Tag-btn">

              <div className="article-Tag-popular">熱門標籤</div>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("翹臀");
                }}
              >
                <p>翹臀</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("蜜大腿");
                }}
              >
                <p>蜜大腿</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("低GI");
                }}
              >
                <p>低GI</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("胸肌");
                }}
              >
                <p>胸肌</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("有氧");
                }}
              >
                <p>有氧</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("蛋白質");
                }}
              >
                <p>蛋白質</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("水煮");
                }}
              >
                <p>水煮</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("體脂率");
                }}
              >
                <p>體脂率</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("負重");
                }}
              >
                <p>負重</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("馬甲線");
                }}
              >
                <p>馬甲線</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("泡芙人");
                }}
              >
                <p>泡芙人</p>
              </button>
              <button
                className="articleTagButton"
                onClick={() => {
                  handleClick("川字肌");
                }}
              >
                <p>川字肌</p>
              </button>
            </div>

          </div>

        </div>
      </div>

    </>
  );
}


const mapStateToProps = createStructuredSelector({
  userPath: userPath,
  currentUserData: currentUserSelect,

});




export default withRouter(connect(mapStateToProps)(Articles))
