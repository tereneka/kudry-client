import {
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import mainPageReducer from "./features/main-page/MainPageSlice";
import masterReducer from "./features/masters/MasterSlice";
import priceReducer from "./features/price/PriceSlice";
import photoReducer from "./features/photo/PhotoSlice";
import regReducer from "./features/registration/RegistrationSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { apiSlice } from "./features/api/apiSlise";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    mainPageState: mainPageReducer,
    masterState: masterReducer,
    priceState: priceReducer,
    photoState: photoReducer,
    regState: regReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const useAppDispatch: () => AppDispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<
  typeof store.getState
>;

export type AppThunk<ReturnType = void> =
  ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
