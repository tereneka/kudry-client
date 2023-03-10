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
import MastersForm from "./MastersForm";
import ServicesForm from "./ServicesForm";

export default function RegistrationForm() {
  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );
  console.log(formValues);

  return (
    <>
      <ServicesForm />
      <MastersForm />
    </>
  );
}
