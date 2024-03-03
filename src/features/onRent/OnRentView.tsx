import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/OnRent.css";
import {
  onRentInfo,
  onRentError,
  onRentUpdatedTime,
  onRentLoading,
  fetchAsyncOnRent,
} from "./OnRentSlice";

const OnRent: React.FC = () => {
  //storeにアクセス
  //レンタル中情報
  const onRentData = useSelector(onRentInfo);
  //エラー時メッセージ
  const onRentErrorMsg = useSelector(onRentError);
  //ロード中判定
  const onRentLoadingJudge = useSelector(onRentLoading);
  //データ取得時間
  const onRentGetTime = useSelector(onRentUpdatedTime);
  const dispatch = useDispatch();

  //データ取得
  useEffect(() => {
    //状態が初期値だったらAPIリクエスト
    if (onRentData === null) {
      dispatch(fetchAsyncOnRent());
    }
  }, [dispatch]);

  return (
    <div className="position_row">
      <div className="on_rent_container">
        <h1 className="on_rent_title">レンタル中情報</h1>
        <div className="time">最終更新時間 : {onRentGetTime}</div>
        <table className="item_container">
          <thead>
            <tr className="on_rent_item_container">
              <td className="box">　</td>
              <td className="box">レンタルID</td>
              <td className="box">ユーザ名</td>
              <td className="item">開始ポート</td>
              <td className="item">開始日時</td>
              <td className="item">車体ナンバー</td>
              <td className="item">現料金</td>
            </tr>
          </thead>
          <tbody>
            {onRentData !== null &&
              onRentData.map((item) => (
                <tr key={item.rent_id} className="on_rent_item_container">
                  <td className="box">
                    <input
                      type="checkbox"
                      // checked={selectedId === item.rent_id}
                      // onChange={() => handleRentId(item.rent_id)}
                    />
                  </td>
                  <td className="box">{item.rent_id}</td>
                  <td
                    className="item"
                    onDoubleClick={() => {
                      // jumpToDetail(item.user_id);
                    }}>
                    {item.user_id}
                  </td>
                  <td className="item">{item.start_port_name}</td>
                  <td className="item">{item.start_date}</td>
                  <td className="item">{item.body_number}</td>
                  <td className="item">{item.fee}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnRent;
