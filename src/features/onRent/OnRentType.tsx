//API引数
export interface OnRentParams {}

//レスポンスのdata
export interface OnRentData {
  rent_id: number;
  user_id: string;
  start_port_name: string;
  start_date: string;
  body_number: string;
  fee: number;
}

//APIレスポンスの型
export interface OnRentApiResponse {
  msg: string;
  data: OnRentData[] | string;
}

//state
export interface OnRentState {
  onRent: OnRentData[] | null;
  updatedTime: string;
  loading: boolean;
  error: string | null;
}
