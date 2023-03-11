import React from "react";
import { useNavigate } from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { setCurrentForm } from "./RegistrationSlice";

export default function RegFormBackBtn() {
  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );
  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleBtnClick() {
    const n =
      currentForm === 2 &&
      filtredMasters &&
      filtredMasters.length < 2
        ? 2
        : 1;

    // navigate(
    //   regPageRouteList[currentForm - n]
    // );
    navigate(-n);

    dispatch(setCurrentForm(currentForm - n));
  }

  return (
    <button
      className="btn btn_size_m reg-form__btn"
      type="button"
      onClick={handleBtnClick}>
      назад
    </button>
  );
}
