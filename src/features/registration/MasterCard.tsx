import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { Master } from "../../types";
import { useGetPhotoQuery } from "../api/apiSlise";
import { setMasterPhotosLoadingState } from "./RegistrationSlice";

interface Props {
  master: Master;
}

export default function MasterCard({
  master,
}: Props) {
  const dispatch = useAppDispatch();

  const { data: masterPhotoUrl, isLoading } =
    useGetPhotoQuery(master.photoLink);

  const isMasterCardChecked = useAppSelector(
    (state) =>
      state.regState.formValues.master?.id
  );

  const masterCardClass = `card reg-form__master-card ${
    isMasterCardChecked === master.id
      ? "reg-form__master-card_checked"
      : ""
  }`;

  useEffect(() => {
    dispatch(
      setMasterPhotosLoadingState({
        key: master.id,
        isLoading,
      })
    );
  }, [isLoading]);

  return (
    <>
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
    </>
  );
}
