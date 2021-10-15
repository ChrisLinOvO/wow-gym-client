import React, { useState, useEffect } from "react";
import "./user-edit.scss";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { currentUserSelect, userPath } from "../../redux/user/user-selector";

function UserEdit({ currentUserSelect, userPath }) {
  // console.log(currentUserSelect);
  const { id } = { ...currentUserSelect };
  // console.log(id)
  // console.log(currentUserSelect)
  const [member, setMember] = useState([]);
  const [memberAccount, setmemberAccount] = useState("");
  const [memberName, setName] = useState("");
  const [memberNickname, setNickName] = useState("");
  const [memberGender, setsex] = useState("男生");
  const [memberBirth, setdate] = useState("");
  const [memberEmail, setmail] = useState("");
  const [memberPhoneNum, setphone] = useState("");
  const [city, setcity] = useState("");
  const [contury, setcontury] = useState("");
  const [memberAddress, setaddress] = useState("");
  const [memberPwd, setpwd] = useState("");
  const [memberImg, setimg] = useState("");
  const [memberid, setmemberid] = useState();
  // console.log("userPath", userPath)
  // useEffect(() => {
  //   if (!id) {
  //     history.push("/login")
  //     alert("請先登入會員！！")
  //   }
  // }, [])

  // console.log("history", history);
  // console.log("location", location);

  async function AddFromToServer(e) {
    const user = await axios.post(
      "http://localhost:5000/api/user/profile/UpdateUser",
      {
        data: {
          memberName,
          memberNickname,
          memberGender,
          memberBirth,
          memberEmail,
          memberPhoneNum,
          memberAddress,
          memberPwd,
          memberImg,
        },
        memberid,
        city,
        contury,
      }
    );
    // console.log(user)
  }

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/user/profile/${memberid}`
      );
      // console.log('test',result.data.memberItem.membersRow)
      setMember(result.data.memberItem.membersRow);
    };
    FetchData();
  }, [memberid]);

  useEffect(() => {
    member.forEach((el) => {
      setName(el.memberName);
      setNickName(el.memberNickname);
      setmail(el.memberEmail);
      setmemberAccount(el.memberAccount);
      setimg(el.memberImg);
      setpwd(el.memberPwd);
      setdate(el.memberBirth);
      setphone(el.memberPhoneNum);
      setcity(el.city);
      setcontury(el.contury);
      setaddress(el.memberAddress);
      setsex(el.memberGender)
    });
  }, [member]);

  useEffect(() => {
    setmemberid(id);
    // console.log('test',memberid)
  }, [id, memberid]);
  return (
    <>
      <div className="edit">
        <p className="edit-title">
          個人資料修改
          <br />
          管理您的檔案以保護您的帳戶
        </p>

        <p className="edit-account">使用者帳號: {memberAccount}</p>
        <form>
          <div className="form-wrapper">
            <div className="left-form">
              <div className="first-line">
                <fieldset>
                  <legend>姓名:</legend>
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <legend>暱稱:</legend>
                  <input
                    type="text"
                    value={memberNickname}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="first-line">
                <fieldset>
                  <legend>生日: </legend>
                  <input
                    type="date"
                    value={memberBirth}
                    onChange={(e) => setdate(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <legend>性別: {memberGender}</legend>
                  <select onChange={(e) => setsex(e.target.value)}>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </fieldset>
              </div>

              <div className="first-line">
                <fieldset>
                  <legend>手機號碼:</legend>
                  <input
                    type="text"
                    minLength="10"
                    pattern="[0-9]*"
                    value={memberPhoneNum}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <legend>電子郵件:</legend>
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setmail(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="first-line">
                <fieldset>
                  <legend>居住地址:</legend>
                  <input
                    className="address-input"
                    maxLength="100"
                    type="text"
                    value={memberAddress}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </fieldset>
              </div>
            </div>

            <div className="right-form">
              <div className="img-card">
                <img className="user-img" alt="user-Img" src={memberImg}></img>
                <input
                  className="user-img-input"
                  type="file"
                  accept=".jpg,.png"
                  onChange={(event) => {
                    let input = event.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function () {
                      let dataURL = reader.result;
                      setimg(dataURL);
                    };
                    reader.readAsDataURL(input);
                  }}
                />
                <p>檔案大小:最大1Mb</p>
                <p>檔案限制:JPEG、PNG</p>
              </div>

              <div className="pwd-card">
                <fieldset>
                  <legend>修改密碼:</legend>
                  <input
                    // minLength="8"
                    type="Password"
                    // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                    placeholder=" 請輸入舊密碼"
                  />
                </fieldset>
                <fieldset className="pwd-input">
                  <input
                    // minLength="8"
                    type="Password"
                    // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                    placeholder=" 請輸入新密碼"
                    onChange={(e) => setpwd(e.target.value)}

                  />
                </fieldset>
                <fieldset className="pwd-input">
                  <input
                    // minLength="8"
                    type="Password"
                    // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                    placeholder=" 請再輸入一次新密碼"
                  />
                </fieldset>

                <div></div>
                <button onClick={() => AddFromToServer()}>儲存</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUserSelect: currentUserSelect,
  userPath: userPath,
});

export default withRouter(connect(mapStateToProps)(UserEdit));
