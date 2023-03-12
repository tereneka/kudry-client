import {
  Form,
  Radio,
  RadioChangeEvent,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store";
import MasterCard from "./MasterCard";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  setCurrentForm,
  setFormValues,
} from "./RegistrationSlice";

export default function MastersForm() {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const masters = useAppSelector(
    (state) => state.regState.filtredMasters
  );

  function handleMasterChage(
    e: RadioChangeEvent
  ) {
    dispatch(
      setFormValues({
        master: masters?.find(
          (master) => master.id === e.target.value
        ),
      })
    );
  }

  function handleFormSubmit(values: {
    master: string;
  }) {
    navigate(regPageRouteList[currentForm + 1]);

    dispatch(setCurrentForm(currentForm + 1));
  }

  return (
    <Form
      form={form}
      className="reg-form"
      name="master"
      initialValues={{
        master: formValues.master?.id,
      }}
      onFinish={handleFormSubmit}
      key={2}>
      <Form.Item
        name="master"
        label="мастер"
        rules={[
          {
            required: true,
            message: "выберите мастера",
          },
        ]}>
        <Radio.Group onChange={handleMasterChage}>
          {masters?.map((master) => (
            <Radio
              value={master.id}
              key={master.id}>
              <MasterCard master={master} />
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <div className="reg-form__btn-group">
        <RegFormBackBtn />
        <RegFormNextBtn />
      </div>
    </Form>
  );
}
