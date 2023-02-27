import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface PriceState {
  isCategoryOpened: string;
}

const initialState: PriceState = {
  isCategoryOpened: "",
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setIsCategoryOpened: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isCategoryOpened = action.payload;
    },
  },
});

export const { setIsCategoryOpened } =
  priceSlice.actions;

export default priceSlice.reducer;
