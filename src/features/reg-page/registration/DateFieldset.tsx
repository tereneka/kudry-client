import { DatePicker, Form } from "antd";
import React from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormSubmitBtn from "./RegFormSubmitBtn";

export default function DateFieldset() {
  dayjs.extend(customParseFormat);
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  // console.log(dayjs().hour() + 0.5);

  const disabledDate: RangePickerProps["disabledDate"] =
    (current) => {
      return (
        current && current < dayjs().endOf("day")
      );
    };
  const disabledDateTime = () => ({
    disabledHours: () => [
      ...range(0, 11),
      ...range(21, 24),
    ],
  });

  return (
    <fieldset className="reg-form__fieldset">
      <Form.Item
        name="date"
        label="дата"
        rules={[
          {
            required: true,
            message: "выберите дату и время",
          },
        ]}>
        <DatePicker
          format="DD-MM-YYYY HH:mm"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          minuteStep={30}
          hideDisabledOptions
          showNow={false}
          showSecond={false}
          showTime={{
            defaultValue: dayjs("11:00", "HH:mm"),
          }}
        />
      </Form.Item>

      <div className="reg-form__btn-group">
        <RegFormBackBtn />
        <RegFormSubmitBtn />
      </div>
    </fieldset>
  );
}
