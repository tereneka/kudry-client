import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LastOpenedPage {
    folderPath: string;
    lastOpenedPage: number
}

interface photoState {
    openedPages: { [key: string]: number }
}

const initialState: photoState = {
    openedPages: {}
}

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setOpenedPages: (state, action: PayloadAction<LastOpenedPage>) => {

            state.openedPages[action.payload.folderPath] = action.payload.lastOpenedPage

            // const currentFolder = state.openedPages.find(i => i.folderPath === action.payload.folderPath)
            // if (currentFolder) {
            //     currentFolder.lastOpenedPage = action.payload.lastOpenedPage
            // } else {
            //     state.openedPages.push(action.payload)
            // }
        },
    },
})

export const { setOpenedPages } = photoSlice.actions

export default photoSlice.reducer