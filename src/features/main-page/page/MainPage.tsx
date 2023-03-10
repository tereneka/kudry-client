import React from "react";
import Header from "../header/Header";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import { useAppSelector } from "../../../store";
import Content from "../content/Content";
import "./main.css";
import PhotoPopup from "../photo/PhotoPopup";
import Footer from "../footer/Footer";
import FixedLinks from "../fixedLinks/FixedLinks";

export default function MainPage() {
  const contentLoadingState = useAppSelector(
    (state) => state.contentState
  );

  const isLoading = Object.values(
    contentLoadingState.isLoading
  ).some((i) => i === true);
  const isError = Object.values(
    contentLoadingState.isError
  ).some((i) => i === true);

  const isPhotoPopupOpened = useAppSelector(
    (state) => state.photoState.popupPhotoUrl
  );

  return (
    <>
      <Header />
      <Spinner isVisible={isLoading} />
      <Error isVisible={isError} />
      <Content
        isLoading={isLoading}
        isError={isError}
      />
      <Footer />
      <FixedLinks />
      {isPhotoPopupOpened && <PhotoPopup />}
    </>
  );
}
