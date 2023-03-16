import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  Category,
  RegistrationContext,
} from "../../../types";
import {
  useGetMasterListQuery,
  useGetServiceListQuery,
} from "../../api/apiSlise";
import {
  setFiltredMasters,
  setFormValues,
} from "./RegistrationSlice";

export default function ServicesForm() {
  const form = Form.useFormInstance();

  const dispatch = useAppDispatch();

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );
  const categores: Category[] | undefined =
    useOutletContext<RegistrationContext>()
      .categores;

  const selectedCategoryId = Form.useWatch<
    string | undefined
  >("category", form);

  const { data: services } =
    useGetServiceListQuery(selectedCategoryId);
  const selectedServiceIdList = Form.useWatch<
    string[] | undefined
  >("services", form);

  const { data: masters } =
    useGetMasterListQuery();

  // продолжительность услуги зависит от длины волос для
  // парикмахерских услуг(кроме мужской стрижки),
  // индекс длительности услуги в массиве в базе данных
  // соответствует value поля формы durationIndex
  const isDurationIndexFormItemVisible = !!(
    formValues.services &&
    formValues.services.some(
      (service) => service.duration.length > 1
    )
  );

  function handleCategoryChange() {
    dispatch(
      setFormValues({
        services: undefined,
        durationIndex: undefined,
      })
    );

    setTimeout(() => {
      form.resetFields([
        "services",
        "durationIndex",
      ]);
    }, 100);
  }

  function handleServicesClear() {
    dispatch(
      setFormValues({
        durationIndex: undefined,
      })
    );

    setTimeout(() => {
      form.resetFields(["durationIndex"]);
    }, 100);
  }

  useEffect(() => {
    dispatch(
      setFiltredMasters(
        masters?.filter(
          (master) =>
            master.categoryIdList.some(
              (categoryId) =>
                categoryId === selectedCategoryId
            ) && master.regAvailable
        )
      )
    );
  }, [selectedCategoryId, masters]);

  useEffect(() => {
    dispatch(
      setFormValues({
        services: services?.filter((service) =>
          selectedServiceIdList?.some(
            (id) => service.id === id
          )
        ),
      })
    );
  }, [selectedServiceIdList]);

  return (
    <>
      {categores && (
        <div className="reg-form__item-group">
          <Form.Item
            name="category"
            label="категория услуг"
            rules={[
              {
                required: true,
                message:
                  "выберите категорию услуг",
              },
            ]}>
            <Select
              options={categores?.map(
                (category) => {
                  return {
                    value: category.id,
                    label: category.name,
                  };
                }
              )}
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
              options={services?.map(
                (service) => {
                  return {
                    value: service.id,
                    label: service.name,
                  };
                }
              )}
              mode="multiple"
              allowClear
              onClear={handleServicesClear}
            />
          </Form.Item>

          {isDurationIndexFormItemVisible && (
            <Form.Item
              name="durationIndex"
              label="длина волос"
              rules={[
                {
                  required: true,
                  message: "выберите длину волос",
                },
              ]}>
              <Select
                options={[
                  "короткие",
                  "средние",
                  "длинные",
                ].map((option, index) => {
                  return {
                    value: index,
                    label: option,
                  };
                })}
              />
            </Form.Item>
          )}
        </div>
      )}
    </>
  );
}
