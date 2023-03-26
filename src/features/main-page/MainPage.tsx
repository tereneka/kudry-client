import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { useAppSelector } from "../../store";
import PhotoPopup from "../photo/PhotoPopup";
import Footer from "../footer/Footer";
import FixedLinks from "../fixedLinks/FixedLinks";
import MasterList from "../masters/MasterList";
import PhotoSection from "../photo/PhotoSection";
import Price from "../price/Price";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const contentLoadingState = useAppSelector(
    (state) => state.mainPageState
  );

  const isLoading = Object.values(
    contentLoadingState.isLoading
  ).some((i) => i);

  const isError = Object.values(
    contentLoadingState.isError
  ).some((i) => i);

  const isPhotoPopupOpened = useAppSelector(
    (state) => state.photoState.popupPhotoUrl
  );

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <Spinner
        isVisible={isLoading}
        className="spinner_for_main-page"
      />
      <Error isVisible={isError} />

      <div
        className={`page ${
          !isLoading && !isError
            ? "page_visible"
            : ""
        }`}>
        <main className="content">
          <MasterList />
          <Price />
          <PhotoSection
            title="интерьер"
            folderPath="interiors"
          />
          <PhotoSection
            title="работы"
            folderPath="works"
          />
        </main>

        <Footer />
        <FixedLinks />
        {isPhotoPopupOpened && <PhotoPopup />}
      </div>
    </>
  );
}
