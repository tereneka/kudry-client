import {
  ConfigProvider,
  Form,
  Select,
  theme,
} from "antd";
import { nanoid } from "nanoid";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  useGetRegCategoryListQuery,
  useGetServiceListQuery,
} from "../../api/apiSlise";
import DateFieldset from "./DateFieldset";
import MastersFieldset from "./MastersFieldset";
import {
  setCurrentFieldset,
  setIsRegNextBtnActive,
  setSelectedCategory,
} from "./RegistrationSlice";
import ServicesFieldset from "./ServicesFieldset";

export default function RegForm() {
  const { data: categores } =
    useGetRegCategoryListQuery();
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );
  const isNextBtnActive = useAppSelector(
    (state) => state.regState.isRegNextBtnActive
  );
  const dispatch = useAppDispatch();
  const fieldsetList = [
    <ServicesFieldset categores={categores} />,
    <MastersFieldset />,
    <DateFieldset />,
  ];
  const servicesRef =
    useRef<HTMLDivElement>(null);
  const mastersRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const nodeRef = [
    servicesRef,
    mastersRef,
    dateRef,
  ][currentFieldset];

  function handleNextBtnClick() {
    dispatch(
      setCurrentFieldset(currentFieldset + 1)
    );
    dispatch(setIsRegNextBtnActive(false));
  }

  function handleBackBtnClick() {
    dispatch(
      setCurrentFieldset(currentFieldset - 1)
    );
    dispatch(setIsRegNextBtnActive(true));
  }

  useEffect(() => {
    if (categores) {
      dispatch(
        setSelectedCategory(categores[0].id)
      );
    }
  }, [categores]);

  return (
    <>
      {categores && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgb(137, 175, 176)",
              colorError: "#c5776b",
              fontFamily:
                '"Source Code Pro", monospace',
              colorTextBase: "rgb(60, 60, 60)",
              fontSize: 16,
            },
          }}>
          <Form
            className="reg-form"
            name="registration"
            initialValues={{
              category: categores[0].id,
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={currentFieldset}
                nodeRef={nodeRef}
                addEndListener={(done: any) => {
                  if (
                    nodeRef &&
                    nodeRef.current
                  ) {
                    nodeRef.current.addEventListener(
                      "transitionend",
                      done,
                      false
                    );
                  }
                }}
                classNames="fade">
                <div ref={nodeRef}>
                  {fieldsetList[currentFieldset]}
                </div>
              </CSSTransition>
            </SwitchTransition>

            <div className="reg-form__btn-group">
              {currentFieldset > 0 && (
                <button
                  className="btn btn_size_m reg-form__btn"
                  type="button"
                  onClick={handleBackBtnClick}>
                  назад
                </button>
              )}

              {currentFieldset <
                fieldsetList.length - 1 && (
                <button
                  className={`btn btn_size_m ${
                    isNextBtnActive
                      ? ""
                      : "btn_disabled"
                  } reg-form__btn reg-form__btn_position_right`}
                  type="button"
                  disabled={!isNextBtnActive}
                  onClick={handleNextBtnClick}>
                  далее
                </button>
              )}

              {currentFieldset ===
                fieldsetList.length - 1 && (
                <button
                  className="btn btn_size_m reg-form__btn reg-form__btn_position_right"
                  type="submit">
                  отправить
                </button>
              )}
            </div>
          </Form>
        </ConfigProvider>
      )}
    </>
  );
}
