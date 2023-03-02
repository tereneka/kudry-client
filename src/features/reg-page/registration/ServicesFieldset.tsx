import { Form, Select } from "antd";
import React, {
  useEffect,
  useState,
} from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  Category,
  Master,
  Service,
} from "../../../types";
import { useGetServiceListQuery } from "../../api/apiSlise";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  setFiltredMasters,
  setSelectedCategoryId,
  setSelectedServices,
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
  const selectedCategoryId = useAppSelector(
    (state) => state.regState.selectedCategoryId
  );
  const selectedServices = useAppSelector(
    (state) => state.regState.selectedServices
  );
  const { data: services } =
    useGetServiceListQuery(selectedCategoryId);
  const selectedServiceIdList = Form.useWatch<
    string[] | undefined
  >("services", form);
  const selectedHairLength = Form.useWatch<
    number | undefined
  >("hairLength", form);
  const [
    isHairLengthFormItemVisible,
    setIsHairLengthFormItemVisible,
  ] = useState(false);

  function handleCategoryChange(id: string) {
    dispatch(setSelectedCategoryId(id));
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
      "hairLength",
      "master",
      "date",
    ]);
  }

  function filterServices(
    serviceIdList: string[]
  ) {
    const result: Service[] = [];
    serviceIdList.forEach((id) => {
      const findedService = services?.find(
        (service) => service.id === id
      );
      if (findedService) {
        result.push(findedService);
      }
    });

    return result;
  }

  useEffect(() => {
    dispatch(
      setSelectedServices(
        selectedServiceIdList
          ? filterServices(selectedServiceIdList)
          : undefined
      )
    );
  }, [selectedServiceIdList]);

  useEffect(() => {
    setIsHairLengthFormItemVisible(
      !!(
        selectedServices &&
        selectedServices.some(
          (service) => service.duration.length > 1
        )
      )
    );
  }, [selectedServices]);

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
          onClear={() =>
            form.resetFields(["hairLength"])
          }
        />
      </Form.Item>

      {isHairLengthFormItemVisible && (
        <Form.Item
          name="hairLength"
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
            // onChange={handleServicesChange}
          />
        </Form.Item>
      )}

      <div className="reg-form__btn-group">
        <RegFormNextBtn
          isDisabled={
            !!!(
              selectedServiceIdList &&
              selectedServiceIdList.length > 0 &&
              (!isHairLengthFormItemVisible ||
                selectedHairLength !== undefined)
            )
          }
        />
      </div>
    </fieldset>
  );
}
