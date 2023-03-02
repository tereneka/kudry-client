import { ConfigProvider, Form } from "antd";
import React, { useEffect, useRef } from "react";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  useGetMasterListQuery,
  useGetRegCategoryListQuery,
} from "../../api/apiSlise";
import DateFieldset from "./DateFieldset";
import MastersFieldset from "./MastersFieldset";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormSubmitBtn from "./RegFormSubmitBtn";
import {
  setFiltredMasters,
  setSelectedCategory,
} from "./RegistrationSlice";
import ServicesFieldset from "./ServicesFieldset";

export default function RegForm() {
  const [form] = Form.useForm();
  const { data: categores } =
    useGetRegCategoryListQuery();
  const { data: masters } =
    useGetMasterListQuery();
  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );
  const dispatch = useAppDispatch();
  const fieldsetList = [
    <ServicesFieldset
      categores={categores}
      masters={masters}
    />,
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

  function handleFormSubmit(values: any) {
    // console.log(values);
  }

  useEffect(() => {
    if (categores) {
      dispatch(
        setSelectedCategory(categores[0].id)
      );
    }
  }, [categores]);

  useEffect(() => {
    if (categores && masters) {
      dispatch(
        setFiltredMasters(
          masters?.filter(
            (master) =>
              master.categoryIdList.some(
                (categoryId) =>
                  categoryId === categores[0].id
              ) && master.regAvailable
          )
        )
      );
    }
  }, [categores, masters]);

  return (
    <>
      {categores && (
        <Form
          className="reg-form"
          name="registration"
          initialValues={{
            category: categores[0].id,
          }}
          form={form}
          onFinish={handleFormSubmit}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={currentFieldset}
              nodeRef={nodeRef}
              addEndListener={(done: any) => {
                if (nodeRef && nodeRef.current) {
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
        </Form>
      )}
    </>
  );
}
