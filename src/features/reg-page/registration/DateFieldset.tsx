import { Calendar, Form, Select } from "antd";
import React from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormSubmitBtn from "./RegFormSubmitBtn";

export default function DateFieldset() {
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

  const form = Form.useFormInstance();
  const selectedTime = Form.useWatch<
    string | undefined
  >("time", form);
  console.log(selectedTime);

  return (
    <fieldset className="reg-form__fieldset">
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
        {/* <RegFormSubmitBtn
          isDisabled={!selectedTime}
        /> */}
      </div>
    </fieldset>
  );
}
