import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  Category,
  Master,
  Service,
} from "../../../types";
import dayjs from "dayjs";

interface RegistrationState {
  // formValues: {
  //   [key: string]: any;
  // };
  formValues: {
    category: Category | undefined;
    services: Service[] | undefined;
    master: Master | undefined;
    durationIndex: number;
    date: string;
    time: string | undefined;
  };
  selectedCategoryId: string;
  selectedServices: Service[] | undefined;
  filtredMasters: Master[] | undefined;
  currentFieldset: number;
  isMasterCardChecked: string;
}

const initialState: RegistrationState = {
  formValues: {
    category: undefined,
    services: undefined,
    master: undefined,
    durationIndex: 0,
    date: dayjs()
      .add(1, "day")
      .format("DD.MM.YYYY"),
    time: undefined,
  },
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

    setFormValues: (
      state,
      action: PayloadAction<{
        [key: string]: any;
      }>
    ) => {
      state.formValues = {
        ...state.formValues,
        ...action.payload,
      };
    },
  },
});

export const {
  setFormValues,
  setSelectedCategoryId,
  setSelectedServices,
  setFiltredMasters,
  setCurrentFieldset,
  setIsMasterCardChecked,
} = registrationSlice.actions;

export default registrationSlice.reducer;
