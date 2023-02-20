import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MasterState {
    cardItemElementWidth: number;
    isFullWidthStyle: boolean
}

const initialState: MasterState = {
    cardItemElementWidth: 0,
    isFullWidthStyle: false,
}

const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setCardItemElementWidth: (state, action: PayloadAction<number>) => {
            state.cardItemElementWidth = action.payload
        },
        setIsFullWidthStyle: (state, action: PayloadAction<boolean>) => {
            state.isFullWidthStyle = action.payload
        }
    },
})

export const { setCardItemElementWidth, setIsFullWidthStyle } = masterSlice.actions;

export default masterSlice.reducer