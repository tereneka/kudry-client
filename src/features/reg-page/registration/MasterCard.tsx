import React from "react";
import { useAppSelector } from "../../../store";
import { Master } from "../../../types";
import { useGetPhotoQuery } from "../../api/apiSlise";

interface Props {
  master: Master;
}

export default function MasterCard({
  master,
}: Props) {
  const {
    data: masterPhotoUrl,
    isLoading,
    isError,
  } = useGetPhotoQuery(master.photoLink);

  const isMasterCardChecked = useAppSelector(
    (state) =>
      state.regState.formValues.master?.id
  );

  const masterCardClass = `card reg-form__master-card ${
    isMasterCardChecked === master.id
      ? "reg-form__master-card_checked"
      : ""
  }`;

  return (
    <div className={masterCardClass}>
      <img
        className="card__img"
        src={masterPhotoUrl}
        alt="фото мастера"
      />
      <h4 className="card__title">
        {master.name}
      </h4>
      <p className="card__about">
        {master.profession}
      </p>
    </div>
  );
}
