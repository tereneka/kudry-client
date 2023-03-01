import { Form, Select } from "antd";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { Category } from "../../../types";
import { useGetServiceListQuery } from "../../api/apiSlise";
import {
  setIsRegNextBtnActive,
  setSelectedCategory,
} from "./RegistrationSlice";

interface Props {
  categores: Category[] | undefined;
}

export default function ServicesFieldset({
  categores,
}: Props) {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.regState.selectedCategory
  );
  const { data: services } =
    useGetServiceListQuery(selectedCategory);

  function handleCategoryChange(id: string) {
    dispatch(setSelectedCategory(id));
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
          onSelect={() => {
            dispatch(setIsRegNextBtnActive(true));
          }}
          onClear={() =>
            dispatch(setIsRegNextBtnActive(false))
          }
          mode="multiple"
          allowClear
        />
      </Form.Item>
    </fieldset>
  );
}
