import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoryVisibility {
    id: string;
    isOpened: boolean
}

interface PriceState {
    categoryListVisibility: CategoryVisibility[]
}

const initialState: PriceState = {
    categoryListVisibility: []
}

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        toggleCategoryVisibility: (state, action: PayloadAction<{ id: string }>) => {
            const currentCategory = state.categoryListVisibility.find(i => i.id === action.payload.id)
            if (currentCategory) {
                currentCategory.isOpened = !currentCategory.isOpened
            }
        },
        setCategoryVisibility: (state, action: PayloadAction<CategoryVisibility>) => {
            state.categoryListVisibility.push(action.payload)
        },
    },
})

export const { toggleCategoryVisibility, setCategoryVisibility } = priceSlice.actions

export default priceSlice.reducer