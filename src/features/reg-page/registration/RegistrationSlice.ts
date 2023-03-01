import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface RegistrationState {
  selectedCategory: string;
  currentFieldset: number;
  isRegNextBtnActive: boolean;
}

const initialState: RegistrationState = {
  selectedCategory: "",
  currentFieldset: 0,
  isRegNextBtnActive: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<string>
    ) => {
      state.selectedCategory = action.payload;
    },

    setCurrentFieldset: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentFieldset = action.payload;
    },

    setIsRegNextBtnActive: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isRegNextBtnActive = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setCurrentFieldset,
  setIsRegNextBtnActive,
} = registrationSlice.actions;

export default registrationSlice.reducer;
