import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface RegistrationState {
  selectedCategory: string;
}

const initialState: RegistrationState = {
  selectedCategory: "",
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
  },
});

export const { setSelectedCategory } =
  registrationSlice.actions;

export default registrationSlice.reducer;
