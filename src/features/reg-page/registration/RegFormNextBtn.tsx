import React from "react";
import { regPageRouteList } from "../../../constants";
import { useAppSelector } from "../../../store";

export default function RegFormNextBtn() {
  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );

  const btnText =
    currentForm + 1 === regPageRouteList.length
      ? "отправить"
      : "вперёд";

  return (
    <button
      className="btn btn_size_m  reg-form__btn reg-form__btn_position_right"
      type="submit">
      {btnText}
    </button>
  );
}
