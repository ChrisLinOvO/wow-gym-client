import React, { useEffect } from "react";
import "./HomePage.scss";
import GYM2 from "../../API/GYM.mp4";

import chi from "./小志.jpg";
import chang from "./小銓.JPG";
import tang from "./小唐.jpg";
import JEANLIN from "./JEANLIN.png";
import CustomButton from "../../component/custom-button/Custom-button";
import { IoIosArrowDropupCircle } from "react-icons/io";

  const HomePage = () => {

    useEffect(() => {
      window.addEventListener("scroll", handlescroll);
      return () => window.removeEventListener("scroll", handlescroll);
    }, []);
  
    const handlescroll = function () {
      // -螢幕高度-144--------------
      if ((this.scrollY > this.screen.height   )) {
        document.getElementById("page2-right").classList.add("sticky");
      } else {
        document.getElementById("page2-right").classList.remove("sticky");
      }
  
      if ((this.scrollY > this.screen.height*2 )) {
        document.getElementById("page3-right").classList.add("sticky");
        document.getElementById("page2-right").classList.remove("sticky");
      } else {
        document.getElementById("page3-right").classList.remove("sticky");
      }
      if ((this.scrollY > this.screen.height*3 )) {
        document.getElementById("page4-left").classList.add("sticky");
        document.getElementById("page3-right").classList.remove("sticky");
      } else {
        document.getElementById("page4-left").classList.remove("sticky");
      }
      if ((this.scrollY > this.screen.height*4 )) {
        document.getElementById("page5-left").classList.add("sticky");
        document.getElementById("page4-left").classList.remove("sticky");
      } else {
        document.getElementById("page5-left").classList.remove("sticky");
      }
   // 螢幕解析度高減去此數---------------   
      if ((this.scrollY > this.screen.height*5)) {
        document.getElementById("page5-left").classList.remove("sticky");
      } else {
      }
  
      if ((this.scrollY > this.screen.height)) {
        document.getElementById("clickreturn").classList.add("show");
      } else {
        document.getElementById("clickreturn").classList.remove("show");
      }
  
    };
  return (
    <>
      <div className="homepage" id="homepagescroll">
        <a id="clickreturn" href="javascript:window.scrollTo(0, 0);">
          <IoIosArrowDropupCircle />
        </a>

        <div className="page1">
          <video autoPlay loop muted className="video">
            <source src={GYM2} type="video/mp4" />
          </video>
          <div className="space"></div>
        </div>

        <div className="page2">
          <div className="page2-left-wrapper">
            <div className="page2-wrapper">
              <p>關於我們</p>
              <span>
                WoW FIT
                於2020年所創立，提供包括個人客製化運動訓練服務，企業團隊健康策略，專業運動教育培訓，與企業健康顧問等服務。
                對 WoW FIT 來說，運動是一件認真的事情。
                作為一個專業的體能顧問，我們帶著真誠藉由科學與數據條理化的方法與您相互合作，為每一次的運動帶來最高效益與價值。
                我們相信「若能幫助您成功的改變生活、邁向健康，自然而然可透過運動創造屬於您的人本價值及生活品質。」
              </span>
            </div>
          </div>
          <div className="page2-right-wrapper" id="page2-right"></div>
        </div>

        <div className="page3">
          <div className="page3-left-wrapper">
            <div className="page3-wrapper">
              <p>頂級健身設備</p>
              <span>
                • 超過百台進口健身器材：
                個人化內建液晶電視心肺器材，電腦化心肺功能，頂尖運動品牌。
                <br />
                • 自由重量區及阻力訓練區：
                多功能、阻力、重量、循環訓練器材，專業教練輔助使用。
                <br />
                • 大型有氧教室及聲光飛輪教室： 包含瑜珈、街舞、 BodyCombat
                、社交舞、拉丁。
                <br />
                • TRX 懸吊訓練區： 風靡好萊塢巨星名模瘦身秘密武器。
                <br />
                • 專業個人教練團隊：
                國際証照的個人教練，為您量身訂做專屬健身計畫。
                <br />
                • 蒸氣室、烤箱、SPA按摩池及淋浴設施：
                一應俱全紓壓設備，提供給上班族下班的最好享受。
                <br />
                • 室內 游泳池 ： 內含游泳池設施，更豐富的運動選擇。
                <br />• VIP 休憩區：
                無線網路、雜誌、報紙設施，在舒適沙發上盡情放鬆休息。
              </span>
            </div>
          </div>
          <div className="page3-right-wrapper" id="page3-right"></div>
        </div>

        <div className="page4">
          <div id="page4-left"></div>
          <div className="page4-right-wrapper">
            <div className="page4-right-news">
              <p>教練課程益處</p>
              <span>
                減低體重:減輕您多餘的體重，降低您身體的負擔
                <br />
                縮緊結實:全身進行雕塑，打造完美動人曲線
                <br />
                增強肌力:提升身體瞬間動能，不怕面對突發狀況
                <br />
                增進耐力:增加身體續航力，天天活力充沛
                <br />
                心肺升級:不再氣喘如牛，告別心血管疾病
              </span>
            </div>
            <div className="page4-left-wrapper-rwd"></div>
          </div>
        </div>

        <div className="page5">
          <div id="page5-left"></div>
          <div className="page5-right-wrapper">
            <div className="page5-right-news">
              <p>最新消息</p>
              <span>
                <h2>振興4倍好禮大放送</h2> <br />
                7/10當天，來資策會參觀前端設計師成果發表會
                <br />
                就送 深層筋膜按摩槍 （價值1029元，送完為止。）
                <br />
                <br />
                加入會員即享好禮四重奏 <br />
                👉1個月WOW FIT會籍 <br />
                👉免入會費 <br />
                👉INBODY身體組成分析 <br />
                👉2堂私人教練課程 <br />
              </span>
              <div className="space"> </div>
              {/* <CustomButton>了解更多</CustomButton> */}
            </div>
            <div className="page5-left-wrapper-rwd"></div>
          </div>
        </div>
        <div className="page6">
          <div className="page6-wrapper"> </div>

          <div className="page6-menu">
            <h1 className="page-6-title">優質教練群</h1>
            <ul>
              <li>
                <img src={chi} alt=""></img>
                <div className="page6-card-right">
                  <h2>小凱</h2>
                  <span>
                    證照： <br />
                    AASFP私人體適能教練
                    <br />
                    VIPR訓練系統指導員
                    <br />
                    NTC訓練系統指導員
                    <br />
                    TRX訓練系統指導員
                    <br />
                    Rumble Ruller 筋膜放鬆證
                    <br />
                    CPR+AED證照 <br /> <br />
                    專長： <br />
                    體態調整、體態評估、各項運動專項表現強化、增重及減重、重訓規劃、核心強化訓練、曲線雕塑
                  </span>
                </div>
              </li>
              <li>
                <img src={chang} alt=""></img>
                <div className="page6-card-right">
                  <h2>小銓</h2>
                  <span>
                    證照：
                    <br />
                    美國AFAA WT證照
                    <br />
                    TRX懸吊式訓練證照
                    <br />
                    VIPR多功能式訓練證照
                    <br />
                    Purmotion爆發力功能訓練證照
                    <br />
                    THUMP Boxing L1﹒L2 證照
                    <br />
                    CPR+AED證照
                    <br /> <br />
                    專長：
                    <br />
                    墊上核心訓練、徒手協調訓練、體態雕塑、筋膜放鬆、健康減脂訓練、心肺健身規劃
                  </span>
                </div>
              </li>
              <li>
                <img src={tang} alt=""></img>
                <div className="page6-card-right">
                  <h2>小唐</h2>
                  <span>
                    證照：
                    <br />
                    AFAA WT重量訓練證照
                    <br />
                    FRE-F泡棉滾筒運動證照
                    <br />
                    TRX STC懸吊訓練師
                    <br />
                    MMA4Ffifcoach Level 1
                    <br />
                    綜合格鬥適能教練認證
                    <br />
                    CKC壺鈴教練認證Level 1<br />
                    CPR+AED證照
                    <br /> <br />
                    專長：
                    <br />
                    體適能訓練、健康減脂訓練、體態雕塑訓練
                  </span>
                </div>
              </li>
              <li>
                <img src={JEANLIN} alt=""></img>
                <div className="page6-card-right">
                  <h2>Jean</h2>
                  <span>
                    證照： <br />
                    健身C級教練
                    <br />
                    跆拳道C級裁判/教練
                    <br />
                    銀髮族體適能指導員
                    <br />
                    EMTI緊急救護員(CPR+AED)
                    <br />
                    中華奧會運動禁藥採樣員
                    <br /> <br />
                    專長： <br />
                    跆拳道、減重與體態雕塑、個人運動處方規劃、功能性訓練、運動按摩
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="page7">
          <h1 className="page-7-title">熱門商品</h1>
          <div className="shop-item-list">
            <ul>
              <li>
                <div className="view view-first">
                  <img src="https://i.ibb.co/2KT3nqN/clothes66.jpg" />

                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      NEO (三條線運動上衣)
                    </h2>
                    <a href="http://localhost:3000/shopitem/women/253" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/3m0Cp19/clothes94.jpg" />
                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      PRO SPORT (運動上衣)
                    </h2>
                    <a href="http://localhost:3000/shopitem/women/259" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/kqjHd2f/clothes21.jpg" />
                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      FAKTEN (運動上衣)
                    </h2>
                    <a href="http://localhost:3000/shopitem/women/238" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/rMwSmzB/clothes3.jpg" />
                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      ID (短袖上衣)
                    </h2>
                    <a href="http://localhost:3000/shopitem/women/232" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/0p5xS62/10.jpg" />
                  <div className="mask">
                    <h2>
                      men's
                      <br />
                      SHMOO 長袖
                    </h2>
                    <a href='http://localhost:3000/shopitem/men/20' className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/mF6Wmn4/WORK-OUT-13.jpg" />
                  <div className="mask">
                    <h2>
                      men's
                      <br />
                      WORK OUT (背心){" "}
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/6" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/GsRcQC8/13.jpg" />
                  <div className="mask">
                    <h2>
                      Men's
                      <br />
                      R.Y.V. (長袖){" "}
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/22" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="shop-item-list2">
            <ul>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/vPpKg48/image-QC28852702-2000-1.jpg"
                  />
                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      ID (運動長褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/208" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/Yd6Pfd5/image-QC28830101-2000-1.jpg"
                  />
                  <div className="mask">
                    <h2>
                      Men's
                      <br />
                      LONG RUN (運動長褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/214" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/jHBhfzT/image-QC28855581-2000-2.jpg"
                  />
                  <div className="mask">
                    <h2>
                      Men's
                      <br />
                      ESSENTIALS (運動短褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/218" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/Wprv96j/image-QC28847341-2000-2.jpg"
                  />

                  <div className="mask">
                    <h2>
                      Women's
                      <br />
                      NEO (運動短褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/226" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img alt="" src="https://i.ibb.co/qm6vTXR/10.jpg" />
                  <div className="mask">
                    <h2>
                      men's
                      <br />
                      ID SPORT (短褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/51" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/9sBWgCD/ADIDAS-X-SPEZIAL-HESWALL-1.jpg"
                  />
                  <div className="mask">
                    <h2>
                      men's
                      <br />
                      LOGO (短褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/53" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="view view-first">
                  <img
                    alt=""
                    src="https://i.ibb.co/0jxVyrz/Women-s-Project-Rock-Terry-Joggers-Trousers-black-grey.png"
                  />
                  <div className="mask">
                    <h2>
                      men's
                      <br />
                      ADICOLOR (運動長褲)
                    </h2>
                    <a href="http://localhost:3000/shopitem/men/34" className="info">
                      More
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;