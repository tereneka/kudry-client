import React, { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { useGetPhotoQuery } from "../api/apiSlise";
import {
  setPhotoLoadingState,
  setPopupPhotoUrl,
} from "./PhotoSlice";

interface Props {
  photoPath: string | undefined;
  folderPath: string;
  pageNumber: string;
}

export default function PhotoItem({
  photoPath,
  folderPath,
  pageNumber,
}: Props) {
  const {
    data: photoUrl,
    isLoading,
    isError,
  } = useGetPhotoQuery(photoPath || "");
  const dispatch = useAppDispatch();

  function handelPhotoClick() {
    dispatch(
      setPopupPhotoUrl(photoUrl ? photoUrl : "")
    );
  }

  useEffect(() => {
    dispatch(
      setPhotoLoadingState({
        isLoading,
        isError,
        folderPath,
        pageNumber,
        key: photoPath ? photoPath : "",
      })
    );
  }, [isLoading, isError, photoPath]);

  return (
    <img
      className="photo__item"
      src={photoUrl}
      onClick={handelPhotoClick}
      alt="фото"
    />
  );
}
