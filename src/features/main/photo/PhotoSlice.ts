import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface photoState {
    openedPages: { [key: string]: number };
    isLoading: { [folderPath: string]: { [pageNumber: string]: { [key: string]: boolean } } };
    isError: { [folderPath: string]: { [pageNumber: string]: { [key: string]: boolean } } };
}

const initialState: photoState = {
    openedPages: {},
    isLoading: {},
    isError: {},
}

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setOpenedPages: (
            state,
            action: PayloadAction<{ folderPath: string; lastOpenedPage: number }>
        ) => {
            state.openedPages[action.payload.folderPath] = action.payload.lastOpenedPage
        },

        setPhotoLoadingState: (state, action: PayloadAction<{
            isLoading: boolean;
            isError: boolean;
            folderPath: string;
            pageNumber: string;
            key: string;
        }>) => {
            if (!state.isLoading[action.payload.folderPath]) {
                state.isLoading[action.payload.folderPath] = {}
                state.isLoading[action.payload.folderPath][action.payload.pageNumber] = {}
                state.isLoading[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isLoading
            } else if (!state.isLoading[action.payload.folderPath][action.payload.pageNumber]) {
                state.isLoading[action.payload.folderPath][action.payload.pageNumber] = {}
                state.isLoading[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isLoading
            } else {
                state.isLoading[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isLoading
            }

            if (!state.isError[action.payload.folderPath]) {
                state.isError[action.payload.folderPath] = {}
                state.isError[action.payload.folderPath][action.payload.pageNumber] = {}
                state.isError[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isError
            } else if (!state.isError[action.payload.folderPath][action.payload.pageNumber]) {
                state.isError[action.payload.folderPath][action.payload.pageNumber] = {}
                state.isError[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isError
            } else {
                state.isError[action.payload.folderPath][action.payload.pageNumber][action.payload.key] = action.payload.isError
            }
        },
    },
})

export const { setOpenedPages, setPhotoLoadingState } = photoSlice.actions

export default photoSlice.reducer