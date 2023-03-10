import { Form, Select } from "antd";
import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  useGetRegCategoryListQuery,
  useGetMasterListQuery,
  useGetServiceListQuery,
} from "../../api/apiSlise";
import RegFormNextBtn from "../registration/RegFormNextBtn";
import {
  setCurrentFieldset,
  setFiltredMasters,
  setFormValues,
} from "../registration/RegistrationSlice";

export default function ServicesForm() {
  const [form] = Form.useForm();
  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const { data: categores } =
    useGetRegCategoryListQuery();
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
  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );

  const isDurationIndexFormItemVisible = !!(
    formValues.services &&
    formValues.services.some(
      (service) => service.duration.length > 1
    )
  );

  const currentFieldset = useAppSelector(
    (state) => state.regState.currentFieldset
  );

  const dispatch = useAppDispatch();

  function handleCategoryChange(id: string) {
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

    form.resetFields([
      "services",
      "durationIndex",
    ]);
  }

  function handleFormSubmit(values: {
    category: string;
    services: string[];
    durationIndex: number;
  }) {
    const n =
      filtredMasters && filtredMasters.length < 2
        ? 2
        : 1;

    dispatch(
      setCurrentFieldset(currentFieldset + n)
    );

    dispatch(
      setFormValues({
        category: categores?.find(
          (category) =>
            category.id === values.category
        ),
        durationIndex: values.durationIndex || 0,
      })
    );
  }

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
        <Form
          form={form}
          className="reg-form"
          name="services"
          initialValues={{
            category: categores[0].id,
          }}
          onFinish={handleFormSubmit}>
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
              onClear={() =>
                form.resetFields([
                  "durationIndex",
                ])
              }
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

          <div className="reg-form__btn-group">
            <RegFormNextBtn isDisabled={false} />
          </div>
        </Form>
      )}
    </>
  );
}
