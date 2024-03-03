//API通信のbaseURLや各設定など
import axios from "axios";

const baseURL = "https://crystal.mods.jp/admin_map/";

//共通
export const axiosSettings = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//リクエスト時のインターセプター
axiosSettings.interceptors.request.use((config) => {
  //トークンを必ず一緒に送る
  const token = sessionStorage.getItem("token");
  config.headers!.Authorization = `Bearer ${token}`;

  return config;
});

//レスポンス時のインターセプター
axiosSettings.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    throw error;
  }
);
