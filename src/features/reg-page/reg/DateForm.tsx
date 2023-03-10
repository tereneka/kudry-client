import React from "react";
import { Calendar, Form, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RegFormBackBtn from "../registration/RegFormBackBtn";
import RegFormNextBtn from "../registration/RegFormNextBtn";
import { useAppDispatch } from "../../../store";
import { setFormValues } from "../registration/RegistrationSlice";

export default function DateForm() {
  const [form] = Form.useForm();

  const selectedTime = Form.useWatch<
    string | undefined
  >("time", form);

  dayjs.extend(customParseFormat);
  const disabledDate: RangePickerProps["disabledDate"] =
    (current) => {
      return (
        current && current < dayjs().endOf("day")
      );
    };

  const timeList = ["11:00"];
  for (let i = 0; i < 18; i++) {
    const time =
      i % 2
        ? parseInt(timeList[i]) + 1 + ":00"
        : timeList[i].slice(0, 3) + "30";

    timeList.push(time);
  }

  const dispatch = useAppDispatch();

  function handleFormSubmit(values: {
    date: dayjs.Dayjs;
    time: string;
  }) {
    dispatch(
      setFormValues({
        date: values.date.format("DD.MM.YYYY"),
        time: values.time,
      })
    );
  }

  return (
    <Form
      form={form}
      className="reg-form"
      name="date"
      initialValues={{
        date: dayjs().add(1, "day"),
      }}
      onFinish={handleFormSubmit}>
      <Form.Item
        name="date"
        label="дата"
        rules={[
          {
            required: true,
            message: "выберите дату",
          },
        ]}>
        <Calendar
          fullscreen={false}
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        name="time"
        label="время"
        rules={[
          {
            required: true,
            message: "выберите время",
          },
        ]}>
        <Select
          options={timeList.map((time) => {
            return {
              value: time,
              label: time,
            };
          })}
        />
      </Form.Item>

      <div className="reg-form__btn-group">
        <RegFormBackBtn />
        <RegFormNextBtn isDisabled={false} />
      </div>
    </Form>
  );
}
