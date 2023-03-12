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
  currentForm: number;
  inProp: boolean;
}

const initialState: RegistrationState = {
  formValues: {
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
  currentForm: 0,
  inProp: false,
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

    setCurrentForm: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentForm = action.payload;
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

    setInProp: (state) => {
      state.inProp = !state.inProp;
    },
  },
});

export const {
  setFormValues,
  setFiltredMasters,
  setCurrentForm,
  setInProp,
} = registrationSlice.actions;

export default registrationSlice.reducer;
