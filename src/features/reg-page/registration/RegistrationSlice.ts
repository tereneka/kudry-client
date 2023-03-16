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
  formValues: {
    id: string | undefined;
    userName: string;
    phone: string;
    category: Category | undefined;
    services: Service[] | undefined;
    master: Master | undefined;
    durationIndex: number | undefined;
    date: string;
    time: string | undefined;
  };
  filtredMasters: Master[] | undefined;
  currentRegistrationPage: number;
  isRegError: boolean;
  isRegistrationLoading: boolean;
}

const initialState: RegistrationState = {
  formValues: {
    id: undefined,
    userName: "",
    phone: "",
    category: undefined,
    services: undefined,
    master: undefined,
    durationIndex: undefined,
    date: dayjs()
      .add(1, "day")
      .format("DD.MM.YYYY"),
    time: undefined,
  },
  filtredMasters: undefined,
  currentRegistrationPage: 0,
  isRegError: false,
  isRegistrationLoading: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setFiltredMasters: (
      state,
      action: PayloadAction<Master[] | undefined>
    ) => {
      state.filtredMasters = action.payload;
    },

    setCurrentRegistrationPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentRegistrationPage =
        action.payload;
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

    setIsRegError: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isRegError = action.payload;
    },

    setIsRegistrationLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isRegistrationLoading =
        action.payload;
    },
  },
});

export const {
  setFormValues,
  setFiltredMasters,
  setCurrentRegistrationPage,
  setIsRegError,
  setIsRegistrationLoading,
} = registrationSlice.actions;

export default registrationSlice.reducer;
