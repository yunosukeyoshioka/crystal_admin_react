import React from "react";
import "../../css/App.css";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userId } from "../login/LoginSlice";
import icon from "../../img/sui.jpg";

const App: React.FC = () => {
  const user = useSelector(userId);

  //ログアウト  使うか不明
  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/admin_map/Login";
  };

  return (
    <div className="side_menu">
      <div className="menu_on">
        <div className="header">
          <img className="icon" src={icon} />
          <div className="user_name">{user} 様</div>
        </div>
        <div className="list_container">
          <ul className="menu_list">
            <li className="list">
              <Link to="/admin_map/On_rent" className="link">
                レンタル中
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Port_info" className="link">
                ポート一覧
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Segway_info" className="link">
                キックボード一覧
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Rent_log" className="link">
                レンタル履歴
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/User_info" className="link">
                ユーザー情報
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Map" className="link">
                マップ
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Receipt" className="link">
                領収書
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Coupon" className="link">
                クーポン
              </Link>
            </li>

            <li className="list">
              <Link to="/admin_map/Inquiry" className="link">
                お問い合わせ
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Subsc" className="link">
                利用状況
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Subsc" className="link">
                　ーユーザー数
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Rental" className="link">
                　ーレンタル
              </Link>
            </li>
            <li className="list">
              <Link to="/admin_map/Pay" className="link">
                　ー乗車金額
              </Link>
            </li>
            <li className="list graphlist">
              <Link to="/admin_map/Port1" className="link">
                ー北区
                <br />
                　西区
              </Link>
            </li>
            <li className="list graphlist">
              <Link to="/admin_map/Port2" className="link">
                ー中村区
                <br />
                　中川区
              </Link>
            </li>
            <li className="list graphlist">
              <Link to="/admin_map/Port3" className="link">
                ー中区
                <br />
                　千種区
                <br />
                　昭和区
                <br />
                　熱田区
                <br />
                　南区
              </Link>
            </li>
            <li className="list">
              <a className="back" href="https://crystal.mods.jp/admin/">
                管理者画面へ戻る
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
