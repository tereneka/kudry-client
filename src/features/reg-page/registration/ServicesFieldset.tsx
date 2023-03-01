import { Form, Select } from "antd";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { Category, Master } from "../../../types";
import { useGetServiceListQuery } from "../../api/apiSlise";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  setFiltredMasters,
  setSelectedCategory,
} from "./RegistrationSlice";

interface Props {
  categores: Category[] | undefined;
  masters: Master[] | undefined;
}

export default function ServicesFieldset({
  categores,
  masters,
}: Props) {
  const form = Form.useFormInstance();
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.regState.selectedCategory
  );
  const { data: services } =
    useGetServiceListQuery(selectedCategory);
  const servicesValue = Form.useWatch<
    string[] | undefined
  >("services", form);

  function handleCategoryChange(id: string) {
    dispatch(setSelectedCategory(id));
    dispatch(
      setFiltredMasters(
        masters?.filter(
          (master) =>
            master.categoryIdList.some(
              (categoryId) => categoryId === id
            ) && master.regAvailable
        )
      )
    );
    form.resetFields(["services", "master"]);
  }

  return (
    <fieldset className="reg-form__fieldset">
      <Form.Item
        name="category"
        label="категория услуг"
        rules={[
          {
            required: true,
            message: "выберите категорию услуг",
          },
        ]}>
        <Select
          style={{
            color: "red",
          }}
          options={categores?.map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          })}
          onChange={handleCategoryChange}
        />
      </Form.Item>

      <Form.Item
        name="services"
        label="услуги"
        rules={[
          {
            required: true,
            message: "выберите услуги",
          },
        ]}>
        <Select
          options={services?.map((service) => {
            return {
              value: service.id,
              label: service.name,
            };
          })}
          mode="multiple"
          allowClear
        />
      </Form.Item>

      <div className="reg-form__btn-group">
        <RegFormNextBtn
          isDisabled={
            !!!(
              servicesValue &&
              servicesValue.length > 0
            )
          }
        />
      </div>
    </fieldset>
  );
}
