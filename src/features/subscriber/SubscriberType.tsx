//API引数
export interface SubscriberParams {}

//APIレスポンスの型
export interface SubscriberApiResponse {
  msg: string;
  data: any;
}

//state
export interface SubscriberState {
  subscriber: SubscriberApiResponse[] | null;
  updatedTime: string;
  loading: boolean;
  error: string;
}
