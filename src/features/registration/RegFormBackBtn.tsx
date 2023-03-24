import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { setCurrentRegistrationPage } from "./RegistrationSlice";

export default function RegFormBackBtn() {
  const currentRegistrationPage = useAppSelector(
    (state) =>
      state.regState.currentRegistrationPage
  );
  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleBtnClick() {
    const n =
      currentRegistrationPage === 2 &&
      filtredMasters &&
      filtredMasters.length < 2
        ? 2
        : 1;

    navigate(-n);

    dispatch(
      setCurrentRegistrationPage(
        currentRegistrationPage - n
      )
    );
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
