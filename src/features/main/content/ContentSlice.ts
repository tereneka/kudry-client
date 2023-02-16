import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
    isLoading: { [key: string]: boolean };
    isError: { [key: string]: boolean };
}

const initialState: LoadingState = {
    isLoading: {},
    isError: {},
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContentLoadingState: (state, action: PayloadAction<{
            isLoading: boolean;
            isError: boolean;
            key: string
        }>) => {
            state.isLoading[action.payload.key] = action.payload.isLoading
            state.isError[action.payload.key] = action.payload.isError
        },
    }
})

export const { setContentLoadingState } = contentSlice.actions

export default contentSlice.reducer
