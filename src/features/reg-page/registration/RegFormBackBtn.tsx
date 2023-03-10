import React from "react";
import { useNavigate } from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { setCurrentFieldset } from "./RegistrationSlice";

export default function RegFormBackBtn() {
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );
  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleBtnClick() {
    const n =
      currentFieldset === 2 &&
      filtredMasters &&
      filtredMasters.length < 2
        ? 2
        : 1;

    // navigate(
    //   regPageRouteList[currentFieldset - n]
    // );
    navigate(-n);

    dispatch(
      setCurrentFieldset(currentFieldset - n)
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
