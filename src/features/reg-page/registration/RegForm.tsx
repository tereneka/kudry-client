import {
  ConfigProvider,
  Form,
  Select,
  theme,
} from "antd";
import React, {
  useEffect,
  useState,
} from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  useGetRegCategoryListQuery,
  useGetServiceListQuery,
} from "../../api/apiSlise";
import { setSelectedCategory } from "./RegistrationSlice";
import ServicesFieldset from "./ServicesFieldset";

export default function RegForm() {
  const { data: categores, isLoading } =
    useGetRegCategoryListQuery();
  const dispatch = useAppDispatch();

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
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}>
            <ServicesFieldset
              categores={categores}
            />
          </Form>
        </ConfigProvider>
      )}
    </>
  );
}
