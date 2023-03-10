import {
  Form,
  Radio,
  RadioChangeEvent,
} from "antd";
import React from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store";
import MasterCard from "../registration/MasterCard";
import RegFormBackBtn from "../registration/RegFormBackBtn";
import RegFormNextBtn from "../registration/RegFormNextBtn";
import {
  setCurrentFieldset,
  setFormValues,
} from "../registration/RegistrationSlice";

export default function MastersForm() {
  const [form] = Form.useForm();

  const masters = useAppSelector(
    (state) => state.regState.filtredMasters
  );

  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );

  const dispatch = useAppDispatch();

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
    dispatch(
      setCurrentFieldset(currentFieldset + 1)
    );
  }

  return (
    <Form
      form={form}
      className="reg-form"
      name="master"
      onFinish={handleFormSubmit}>
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
        <RegFormNextBtn isDisabled={false} />
      </div>
    </Form>
  );
}