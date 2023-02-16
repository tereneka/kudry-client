import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contentReducer from './features/main/content/ContentSlice'
import priceReducer from './features/main/price/PriceSlice'
import photoReducer from './features/main/photo/PhotoSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { apiSlice } from './features/api/apiSlise';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        contentState: contentReducer,
        priceState: priceReducer,
        photoState: photoReducer,
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