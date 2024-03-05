import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/PortInfo.css";
import {
  PortInfoInfo as portInfoInfo,
  PortInfoError as portInfoError,
  PortInfoUpdatedTime as portInfoUpdatedTime,
  PortInfoLoading as portInfoLoading,
  fetchAsyncPortInfo,
} from "./PortInfoSlice";

import { Link } from "react-router-dom";

const PortInfo: React.FC = () => {
  //storeにアクセス
  //レンタル中情報
  const portInfoData = useSelector(portInfoInfo);
  //エラー時メッセージ
  const portInfoErrorMsg = useSelector(portInfoError);
  //ロード中判定
  const portInfoLoadingJudge = useSelector(portInfoLoading);
  //データ取得時間
  const portInfoGetTime = useSelector(portInfoUpdatedTime);
  const dispatch = useDispatch();

  //データ取得
  useEffect(() => {
    //状態が初期値だったらAPIリクエスト
    if (portInfoData === null) {
      dispatch(fetchAsyncPortInfo());
    }
  }, [dispatch, portInfoData]);

  return (
    <div className="position_row">
      <div className="port_info_container">
        <h1 className="port_info_title">ポート情報一覧</h1>
        <div className="time">最終更新時間 : {portInfoGetTime}</div>
        <Link to="/admin_map/Segway" className="to_segway_button">
          キックボード一覧へ
        </Link>
        <table className="item_container">
          <thead>
            <tr key="port_title" className="port_item_container">
              <td className="port_id_item font_item">ポートID</td>
              <td className="port_state_item font_item">ポートステータス</td>
              <td className="port_name_item font_item">ポート名</td>
              <td className="port_address_item font_item">住所</td>
              <td className="max_number_item font_item">駐車可能台数</td>
              <td className="now_number_item font_item">駐車台数</td>
            </tr>
          </thead>
          <tbody>

            
          {portInfoData !== null &&
            portInfoData.map((item)=> (
              <tr
                key={`${item.port_name}${item.port_address}`}
                className="port_item_container">
                <td className="port_id_item font_item">{item.port_id}</td>
                <td className="port_state_item font_item">{item.port_state}</td>
                <td className="port_name_item font_item">
                  {item.port_id} {item.port_name}
                </td>
                <td className="port_address_item font_item">
                  {item.port_address}
                </td>
                <td className="max_number_item font_item">{item.max_number}</td>
                <td className="now_number_item font_item">{item.now_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortInfo;
