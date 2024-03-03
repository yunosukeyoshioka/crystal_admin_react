import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/RentLog.css";
import {
  initialRentLogInfo,
  otherRentLogInfo,
  rentLogError,
  rentLogUpdatedTime,
  rentLogLoading,
  fetchAsyncRentLog,
} from "./RentLogSlice";
import { RentLogData, ModalProps } from "./RentLogType";

const RentLog: React.FC = () => {
  //ページネーション
  const [page, setPage] = useState<number>(1);
  //storeにアクセス
  //レンタル中情報
  const initialRentLogData = useSelector(initialRentLogInfo);
  const otherRentLogData = useSelector(otherRentLogInfo);
  //エラー時メッセージ
  const rentLogErrorMsg = useSelector(rentLogError);
  //ロード中判定
  const rentLogLoadingJudge = useSelector(rentLogLoading);
  //データ取得時間
  const rentLogGetTime = useSelector(rentLogUpdatedTime);
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState<RentLogData | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  //モーダル制御
  const handleModal = (item: RentLogData) => {
    setSelectedItem(item);
    setModal(!modal);
  };

  // モーダルコンポーネント
  const Modal: React.FC<ModalProps> = ({ item }) => (
    <div className="modal">
      rent_id : {item.rent_id} 名前 : {item.user_name}
      <br />
      order_id : {item.order_id}
      <br />
      cust_code : {item.cust_code}
    </div>
  );

  //データ取得
  useEffect(() => {
    //状態が初期値だったらAPIリクエスト
    if (page === 1) {
      if (initialRentLogData === null) {
        dispatch(fetchAsyncRentLog(1));
      }
    } else {
      dispatch(fetchAsyncRentLog(page));
    }
  }, [page]);

  return (
    <div className="position_row">
      <div className="rent_log_container">
        {modal && <Modal item={selectedItem!} />}
        <h1 className="rent_log_title">レンタル履歴情報</h1>
        {page === 1 && (
          <div className="time">最終更新時間 : {rentLogGetTime}</div>
        )}
        <table className="item_container">
          <thead>
            <tr key={"rent_log_title"} className="log_item_container">
              <td className="port_id_item font_item">レンタルID</td>
              <td className="port_state_item font_item">ユーザID</td>
              <td className="port_name_item font_item">開始ポート</td>
              <td className="port_address_item font_item">終了ポート</td>
              <td className="max_number_item font_item">開始時間</td>
              <td className="now_number_item font_item">終了時間</td>
              <td className="now_number_item font_item">車体ナンバー</td>
              <td className="now_number_item font_item">料金</td>
              <td className="now_number_item font_item">クーポン</td>
              <td className="now_number_item font_item">発生料金</td>
              <td className="now_number_item font_item">支払い</td>
            </tr>
          </thead>
          <tbody>
            {(page === 1 ? initialRentLogData : otherRentLogData)?.map(
              (item) => (
                <tr key={item.rent_id} className="log_item_container">
                  <td
                    className="port_id_item font_item"
                    onClick={() => handleModal(item)}>
                    {item.rent_id}
                  </td>
                  <td
                    className="port_state_item font_item"
                    onClick={() => handleModal(item)}
                    //   onDoubleClick={() => jumpToDetail(item.user_id)}
                  >
                    {item.user_id}
                  </td>
                  <td className="port_name_item font_item">
                    {item.start_port_name}
                  </td>
                  <td className="port_address_item font_item">
                    {item.end_port_name}
                  </td>
                  <td className="max_number_item font_item">
                    {item.start_date}
                  </td>
                  <td className="now_number_item font_item">{item.end_date}</td>
                  <td className="now_number_item font_item">
                    {item.body_number}
                  </td>
                  <td className="port_id_item font_item">{item.fee}</td>
                  <td className="port_id_item font_item">{item.coupon_id}</td>
                  <td className="port_id_item font_item">{item.actual_fee}</td>
                  <td className="port_id_item font_item">{item.success}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="rent_log_footer">
          <button
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}>
            前へ
          </button>
          <span className="rent_log_page">{page}</span>
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentLog;
