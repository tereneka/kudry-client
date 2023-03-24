import {
  Form,
  Radio,
  RadioChangeEvent,
} from "antd";
import React from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store";
import MasterCard from "./MasterCard";
import { setFormValues } from "./RegistrationSlice";

export default function MastersForm() {
  const dispatch = useAppDispatch();

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

  return (
    <div className="reg-form__item-group">
      <Form.Item
        name="master"
        label="мастер"
        rules={[
          {
            required: true,
            message: "выберите мастера",
          },
        ]}>
        <Radio.Group
          className="reg-form__radio-group reg-form__radio-group_name_master"
          onChange={handleMasterChage}>
          {masters?.map((master) => (
            <Radio
              value={master.id}
              key={master.id}>
              <MasterCard master={master} />
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
