import {
  Form,
  Radio,
  RadioChangeEvent,
} from "antd";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import MasterCard from "./MasterCard";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormNextBtn from "./RegFormNextBtn";
import { setIsMasterCardChecked } from "./RegistrationSlice";

export default function MastersFieldset() {
  const masters = useAppSelector(
    (state) => state.regState.filtredMasters
  );
  const dispatch = useAppDispatch();
  const form = Form.useFormInstance();
  const selectedMasterId = Form.useWatch<
    string | undefined
  >("master", form);

  function handleMasterChage(
    e: RadioChangeEvent
  ) {
    dispatch(
      setIsMasterCardChecked(e.target.value)
    );
    form.resetFields(["date"]);
  }

  return (
    <fieldset className="reg-form__fieldset reg-form__fieldset_name_masters">
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
        <RegFormNextBtn
          isDisabled={!selectedMasterId}
        />
      </div>
    </fieldset>
  );
}
