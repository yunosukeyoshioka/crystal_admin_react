import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSettings } from "../../axios/axios";
import {
  SubscriberState,
  SubscriberParams,
  SubscriberApiResponse,
} from "./SubscriberType";
import { RootState } from "../../redux/store";
import { GetTime } from "../../timeget/timeget";

//情報取得API連携
export const fetchAsyncSubscriber: any = createAsyncThunk<
  SubscriberParams,
  SubscriberApiResponse
>("Subscriber/post", async () => {
  const response = await axiosSettings.post(
    "build/dashboard_data/subscriber.php"
  );
  return response.data;
});

const initialState: SubscriberState = {
  subscriber: null,
  updatedTime: "",
  loading: false,
  error: "",
};

const SubscriberSlice = createSlice({
  name: "Subscriber",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncSubscriber.fulfilled, (state, action) => {
      //トークン認証&通信成功、データを受け取る
      if (action.payload.msg === "Success") {
        state.subscriber = action.payload.data;
        state.updatedTime = GetTime();
      } else {
        state.error = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(fetchAsyncSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAsyncSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.data || "Failed to fetch users";
    });
  },
});

export const SubscriberInfo = (state: RootState) => state.Subscriber.subscriber;
export const SubscriberError = (state: RootState) => state.Subscriber.error;
export const SubscriberLoading = (state: RootState) => state.Subscriber.loading;
export const SubscriberUpdatedTime = (state: RootState) =>
  state.Subscriber.updatedTime;
export default SubscriberSlice.reducer;
