import React, { useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { setPopupPhotoUrl } from "./PhotoSlice";

export default function PhotoPopup() {
  const photoUrl = useAppSelector(
    (state) => state.photoState.popupPhotoUrl
  );
  const dispatch = useAppDispatch();
  const photoRef = useRef(null);
  const containerRef =
    useRef<HTMLDivElement>(null);

  function handlePopupClick(
    e: React.MouseEvent<
      HTMLDivElement,
      MouseEvent
    >
  ) {
    // перед закрытием попапа удаляем класс "popup__container_opened", чтобы сработала анимация
    if (e.target !== photoRef.current) {
      containerRef.current?.classList.remove(
        "popup__container_opened"
      );

      setTimeout(() => {
        dispatch(setPopupPhotoUrl(""));
      }, 500);
    }
  }

  return (
    <div
      className="popup"
      onClick={handlePopupClick}>
      <div
        className="popup__container popup__container_opened"
        ref={containerRef}>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие фотографии"></button>
        <img
          className="popup__photo"
          src={photoUrl}
          ref={photoRef}
          alt="фото"
        />
      </div>
    </div>
  );
}
