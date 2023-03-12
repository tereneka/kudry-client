import { Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import { categores } from "../../../db/initialDbData";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  setCurrentForm,
  setFormValues,
} from "./RegistrationSlice";

export default function UserInfoForm() {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  function handleFormSubmit(values: {
    userName: string;
    phone: string;
  }) {
    navigate(regPageRouteList[currentForm + 1]);

    dispatch(setCurrentForm(currentForm + 1));

    dispatch(
      setFormValues({
        userName: values.userName,
        phone: `+7${values.phone}`,
      })
    );
  }

  return (
    <Form
      form={form}
      className="reg-form"
      name="userInfo"
      initialValues={{
        userName: formValues.userName,
        phone: formValues.phone.slice(2),
      }}
      onFinish={handleFormSubmit}
      key={0}>
      <Form.Item
        name="userName"
        label="имя"
        rules={[
          {
            required: true,
            message: "введите имя",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="телефон"
        rules={[
          {
            required: true,
            message: "введите номер телефона",
          },
          {
            min: 10,
            message:
              "минимальное количествосимволов 10",
          },
        ]}>
        <Input
          addonBefore={"+7"}
          maxLength={10}
        />
      </Form.Item>

      <div className="reg-form__btn-group">
        <RegFormNextBtn />
      </div>
    </Form>
  );
}
