import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { Master } from "../../../types";
import {
  useGetRegCategoryListQuery,
  useGetMasterListQuery,
  useGetServiceListQuery,
} from "../../api/apiSlise";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  setCurrentForm,
  setFiltredMasters,
  setFormValues,
} from "./RegistrationSlice";

export default function ServicesForm() {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );

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

  function handleFormSubmit(values: {
    category: string;
    services: string[];
    durationIndex: number;
  }) {
    // если мастеров в выбранной категории меньше двух пропускаем форму выбора мастера
    let master: Master | undefined;

    if (filtredMasters) {
      master =
        filtredMasters.length > 1
          ? undefined
          : filtredMasters[0];
    }

    const n = master ? 2 : 1;

    navigate(regPageRouteList[currentForm + n]);

    dispatch(setCurrentForm(currentForm + n));

    dispatch(
      setFormValues({
        category: categores?.find(
          (category) =>
            category.id === values.category
        ),
        durationIndex: values.durationIndex || 0,
        master: master || formValues.master,
      })
    );
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
        <Form
          className="reg-form"
          form={form}
          name="services"
          initialValues={{
            category:
              formValues.category?.id ||
              categores[0].id,
            services: formValues.services?.map(
              (service) => service.id
            ),
            durationIndex:
              formValues.durationIndex,
          }}
          onFinish={handleFormSubmit}
          layout={"vertical"}>
          <div className="reg-form__btn-group">
            <RegFormBackBtn />
            <RegFormNextBtn />
          </div>
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
                    message:
                      "выберите длину волос",
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
        </Form>
      )}
    </>
  );
}
