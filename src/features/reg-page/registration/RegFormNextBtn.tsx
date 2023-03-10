import React from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store";
import { setCurrentFieldset } from "./RegistrationSlice";

interface Props {
  isDisabled: boolean;
}

export default function RegFormNextBtn({
  isDisabled,
}: Props) {
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );
  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );
  const dispatch = useAppDispatch();

  function handleBtnClick() {
    const n =
      currentFieldset === 0 &&
      filtredMasters &&
      filtredMasters.length < 2
        ? 2
        : 1;
    dispatch(
      setCurrentFieldset(currentFieldset + n)
    );
  }

  return (
    <button
      className={`btn btn_size_m ${
        isDisabled ? "btn_disabled" : ""
      } reg-form__btn reg-form__btn_position_right`}
      type="submit"
      // disabled={isDisabled}
      // onClick={handleBtnClick}
    >
      вперёд
    </button>
  );
}
