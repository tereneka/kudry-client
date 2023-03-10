import React, { useEffect, useRef } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store";
import {
  useGetRegCategoryListQuery,
  useGetMasterListQuery,
} from "../../api/apiSlise";
import { setFormValues } from "../registration/RegistrationSlice";
import ServicesForm from "./ServicesForm";

export default function RegistrationForm() {
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );

  return (
    <>
      <ServicesForm />
    </>
  );
}
