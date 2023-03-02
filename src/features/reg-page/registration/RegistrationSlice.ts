import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Master, Service } from "../../../types";

interface RegistrationState {
  selectedCategoryId: string;
  selectedServices: Service[] | undefined;
  filtredMasters: Master[] | undefined;
  currentFieldset: number;
  isMasterCardChecked: string;
}

const initialState: RegistrationState = {
  selectedCategoryId: "",
  selectedServices: undefined,
  filtredMasters: undefined,
  currentFieldset: 0,
  isMasterCardChecked: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setSelectedCategoryId: (
      state,
      action: PayloadAction<string>
    ) => {
      state.selectedCategoryId = action.payload;
    },

    setSelectedServices: (
      state,
      action: PayloadAction<Service[] | undefined>
    ) => {
      state.selectedServices = action.payload;
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
  setSelectedCategoryId,
  setSelectedServices,
  setFiltredMasters,
  setCurrentFieldset,
  setIsMasterCardChecked,
} = registrationSlice.actions;

export default registrationSlice.reducer;
