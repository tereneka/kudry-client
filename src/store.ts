import {
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import contentReducer from "./features/main-page/content/ContentSlice";
import masterReducer from "./features/main-page/masters/MasterSlice";
import priceReducer from "./features/main-page/price/PriceSlice";
import photoReducer from "./features/main-page/photo/PhotoSlice";
import regReducer from "./features/reg-page/registration/RegistrationSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { apiSlice } from "./features/api/apiSlise";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    contentState: contentReducer,
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
