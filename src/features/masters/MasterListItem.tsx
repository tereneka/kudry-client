import React, { useEffect, useRef } from "react";
import { useGetPhotoQuery } from "../api/apiSlise";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { Master } from "../../types";
import { setCardItemElementWidth } from "./MasterSlice";
import { setMainPageLoadingState } from "../main-page/MainPageSlice";

interface Props {
  master: Master;
}

export default function MasterListItem({
  master,
}: Props) {
  const {
    data: masterPhotoUrl,
    isLoading,
    isError,
  } = useGetPhotoQuery(master.photoLink);

  const isFullWidthStyle = useAppSelector(
    (state) => state.masterState.isFullWidthStyle
  );

  const cardsItemRef =
    useRef<HTMLDivElement>(null);

  const cardsItemElement = cardsItemRef.current;

  const dispatch = useAppDispatch();

  const cardsItemClass = `card cards__item ${
    isFullWidthStyle
      ? "cards__item_fullwidth"
      : ""
  }`;

  useEffect(() => {
    if (cardsItemElement) {
      dispatch(
        setCardItemElementWidth(
          cardsItemElement.clientWidth
        )
      );
    }
  });

  useEffect(() => {
    dispatch(
      setMainPageLoadingState({
        isLoading,
        isError,
        key: `masterPhotoUrl-${master.id}`,
      })
    );
  }, [isLoading, isError]);

  return (
    <div
      className={cardsItemClass}
      ref={cardsItemRef}>
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
