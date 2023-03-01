import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Master } from "../../../types";

interface RegistrationState {
  selectedCategory: string;
  filtredMasters: Master[] | undefined;
  currentFieldset: number;
  isMasterCardChecked: string;
}

const initialState: RegistrationState = {
  selectedCategory: "",
  filtredMasters: undefined,
  currentFieldset: 0,
  isMasterCardChecked: "",
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

    setFiltredMasters: (
      state,
      action: PayloadAction<Master[] | undefined>
    ) => {
      state.filtredMasters = action.payload;
    },

    setCurrentFieldset: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentFieldset = action.payload;
    },

    setIsMasterCardChecked: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isMasterCardChecked = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setFiltredMasters,
  setCurrentFieldset,
  setIsMasterCardChecked,
} = registrationSlice.actions;

export default registrationSlice.reducer;
