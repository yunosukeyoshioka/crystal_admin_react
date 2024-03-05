//API引数
export interface PortInfoParams {}

//レスポンスのdata
export interface PortInfoData {
  port_name: string;
  port_address: string;
  port_id: number;
  port_state: number;
  max_number: number;
  now_number: number;
}

//APIレスポンスの型
export interface PortInfoApiResponse {
  msg: string;
  data: PortInfoData[] | string;
}

//state
export interface PortInfoState {
  portInfo: PortInfoData[] | null;
  updatedTime: string;
  loading: boolean;
  error: string | null;
}
