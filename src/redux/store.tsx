//一元的に状態を管理するstore
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from "../features/login/LoginSlice";

import OnRentReducer from "../features/onRent/OnRentSlice";
import RentLogReducer from "../features/rentLog/RentLogSlice";
import SubscriberReducer from "../features/subscriber/SubscriberSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    OnRent: OnRentReducer,
    RentLog: RentLogReducer,
    Subscriber: SubscriberReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
