//API引数
export interface RentLogParams {
  page: number;
}

//レスポンスのdata
export interface RentLogData {
  rent_id: number;
  user_id: string;
  start_port_name: string;
  end_port_name: string;
  start_date: string;
  end_date: string;
  body_number: string;
  fee: number;
  coupon_id: string;
  actual_fee: number;
  success: string;
  user_name: string;
  order_id: string;
  cust_code: string;
}

//APIレスポンスの型
export interface RentLogApiResponse {
  msg: string;
  data: RentLogData[] | string;
}

//state
export interface RentLogState {
  initialRentLog: RentLogData[] | null;
  otherRentLog: RentLogData[] | null;
  updatedTime: string;
  loading: boolean;
  error: string | null;
}

//モーダル表示の型
export interface ModalProps {
  item: RentLogData;
}
