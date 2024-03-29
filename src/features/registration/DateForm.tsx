import React from "react";
import { Calendar, Form, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { dateFormat } from "../../constants";
import { useOutletContext } from "react-router-dom";
import { RegistrationContext } from "../../types";
import { setFormValues } from "./RegistrationSlice";

export default function DateForm() {
  const form = Form.useFormInstance();

  const dispatch = useAppDispatch();

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const selectedDate = Form.useWatch<dayjs.Dayjs>(
    "date",
    form
  );

  const { registrationList } =
    useOutletContext<RegistrationContext>();

  const masterRegList = registrationList?.filter(
    (reg) =>
      reg.masterId === formValues.master?.id
  );

  // массив времени для селекта формы
  const timeList = ["11:00"];
  for (let i = 0; i < 18; i++) {
    const time =
      i % 2
        ? parseInt(timeList[i]) + 1 + ":00"
        : timeList[i].slice(0, 3) + "30";

    timeList.push(time);
  }

  // определяем недоступные даты для записи
  const masterDateList: {
    [key: string]: string[];
  } = {};
  // в переменную masterDisabledDate записываем даты с полной записью у выбранного мастера
  const masterDisabledDate: string[] = [];

  masterRegList?.forEach((reg) => {
    const dateStr = reg.date
      .toDate()
      .toLocaleDateString();
    if (masterDateList[dateStr]) {
      masterDateList[dateStr].concat(reg.time);
    } else {
      masterDateList[dateStr] = reg.time;
    }
  });

  for (let key in masterDateList) {
    if (masterDateList[key].length >= 19)
      masterDisabledDate.push(key);
  }

  dayjs.extend(customParseFormat);
  const disabledDate: RangePickerProps["disabledDate"] =
    (current) => {
      return (
        (current &&
          current < dayjs().endOf("day")) ||
        masterDisabledDate.some(
          (date) =>
            date === current.format(dateFormat)
        ) ||
        !getDisabledTime(current).some((i) => i)
      );
    };

  const timeSelectOptions = timeList.map(
    (time, index) => {
      const isDisabled =
        !getDisabledTime(selectedDate)[index];
      return {
        value: time,
        label: time,
        disabled: isDisabled,
        className: `reg-form__select-option ${
          isDisabled
            ? "reg-form__select-option_disabled"
            : ""
        }`,
      };
    }
  );

  function getDisabledTime(date: dayjs.Dayjs) {
    // определяем недоступное время для записи
    const disabledTime = timeList.map((time) => {
      return masterDateList[
        date?.format(dateFormat)
      ]?.includes(time)
        ? false
        : true;
    });

    disabledTime.forEach((time, index) => {
      if (!time) {
        // блокируем время, чтобы записи не наложились друг на друга
        for (
          let i = 1;
          i < formValues.duration;
          i++
        ) {
          disabledTime[index - i] = false;
        }
      } else if (
        index === disabledTime.length - 1 &&
        formValues.duration > 2
      ) {
        // блокируем время, чтобы окончание записи не было позднее 21:00
        for (
          let i = 0;
          i < formValues.duration - 2;
          i++
        ) {
          disabledTime[index - i] = false;
        }
      }
    });

    return disabledTime;
  }

  function handleDateChange() {
    dispatch(
      setFormValues({
        time: undefined,
      })
    );

    setTimeout(() => {
      form.resetFields(["time"]);
    }, 100);
  }

  return (
    <>
      <div className="reg-form__item-group">
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
            dateCellRender={(current) => {
              if (disabledDate(current)) {
                return (
                  <div className="reg-form__disabled-cell-box" />
                );
              }
            }}
            onChange={handleDateChange}
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
          <Select options={timeSelectOptions} />
        </Form.Item>
      </div>

      <p className="reg-form__caption">
        &nbsp; &mdash; недоступные для записи
        дата/время
      </p>
    </>
  );
}
