import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type StatusStr = 'idle' | 'loading' | 'failed'
// Define a type for the slice state
interface NotificationState {
    errorMessage: string;
    // status: StatusStr[]
    status: {
        masters: StatusStr
    }
}

const initialState: NotificationState = {
    errorMessage: '',
    // status: []
    status: {
        masters: 'idle'
    }
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<{ status: StatusStr, key: 'masters' }>) => {
            state.status[action.payload.key] = action.payload.status
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        }
    }
})

export const { setStatus, setErrorMessage } = notificationSlice.actions

export const selectNotification = (state: RootState) => state.notification

export default notificationSlice.reducer