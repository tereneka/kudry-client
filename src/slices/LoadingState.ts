import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface LoadingState {
    isLoading: { [key: string]: boolean };
    isError: { [key: string]: boolean };
}

interface Parameter {
    isLoading: boolean;
    isError: boolean;
    key: string
}

const initialState: LoadingState = {
    isLoading: {},
    isError: {},
}

const loadingStateSlice = createSlice({
    name: 'loadingState',
    initialState,
    reducers: {
        setIsLoadingState: (state, action: PayloadAction<Parameter>) => {
            state.isLoading[action.payload.key] = action.payload.isLoading
            state.isError[action.payload.key] = action.payload.isError
        },
    }
})

export const { setIsLoadingState } = loadingStateSlice.actions

export default loadingStateSlice.reducer
