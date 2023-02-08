import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notificationReducer from './slices/NotificationSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { apiSlice } from './slices/apiSlise';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        notification: notificationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;