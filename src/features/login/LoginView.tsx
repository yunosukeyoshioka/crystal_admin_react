//React、hooks
import React, { useEffect, useState } from "react";
//css
import "../../css/Login.css";

import { useDispatch, useSelector } from "react-redux";
import {
  userId,
  errorMsg,
  loginJudge,
  fetchAsyncLogin,
  editUserId,
} from "./LoginSlice";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const userIdValue = useSelector(userId);
  //パスワードはコンポーネント内でのみ管理
  const [password, setPassword] = useState("");
  //エラーメッセージ
  const errorMessage = useSelector(errorMsg);
  //ログイン成功判定
  const loginJudgement = useSelector(loginJudge);
  //reducerにアクセス
  const dispatch = useDispatch();
  //リダイレクト用
  const navigate = useHistory();

  //ログイン成功？
  useEffect(() => {
    console.log("useeffect");
    if (loginJudgement) {
      navigate.push("/admin_map/");
    }
  }, [loginJudgement, navigate]);

  //ログインフォーム送信関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchAsyncLogin({ user_id: userIdValue, password: password }));
  };
  return (
    <>
      <div className="login_container">
        <form className="login_form">
          <div className="login_title_container">
            <h1 className="login_title">Su__i 管理者画面　ログイン</h1>
          </div>
          <div className="login_input_container">
            {errorMessage && <div className="error_msg">{errorMessage}</div>}
            <input
              className="login_id_item"
              type="text"
              placeholder="user_id"
              name="user_id"
              value={userIdValue}
              onChange={(e) => dispatch(editUserId(e.target.value))}
            />
            <input
              className="login_password_item"
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login_submit_button_container">
            <button className="login_submit_button" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
