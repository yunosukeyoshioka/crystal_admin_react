//state
export interface LoginState {
  user: string;
  msg: string;
  loginSuccess: boolean;
}

// ログインのパラメーター
export interface LoginParams {
  user_id: string;
  password: string;
}

// APIレスポンスの型
export interface LoginApiResponse {
  msg: string;
  data: string;
  user?: string;
  token?: string;
}
