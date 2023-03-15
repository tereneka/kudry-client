import React, { useRef, useState } from "react";
import { Calendar, Form, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RegFormBackBtn from "./RegFormBackBtn";
import RegFormNextBtn from "./RegFormNextBtn";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  setCurrentForm,
  setFormValues,
  setIsRegError,
} from "./RegistrationSlice";
import {
  useAddRegistrationMutation,
  useGetRegistrationAfterTodayListQuery,
} from "../../api/apiSlise";
import {
  dateFormat,
  regPageRouteList,
} from "../../../constants";
import {
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../db/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";

export default function DateForm() {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentForm = useAppSelector(
    (state) => state.regState.currentForm
  );

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const [addRegistration, { isLoading }] =
    useAddRegistrationMutation();

  const [
    isCurrentRegLoading,
    setIsCurrentRegLoading,
  ] = useState(false);

  const selectedDate = Form.useWatch<dayjs.Dayjs>(
    "date",
    form
  );

  const { data: registrationList } =
    useGetRegistrationAfterTodayListQuery();

  const masterRegList = registrationList?.filter(
    (reg) =>
      reg.masterId === formValues.master?.id
  );

  const currentRegDuration =
    formValues?.services?.reduce(
      (sum, currentService) => {
        const currentValue: number =
          currentService.duration.length > 1 &&
          formValues.durationIndex
            ? currentService.duration[
                formValues.durationIndex
              ]
            : currentService.duration[0];
        return sum + currentValue;
      },
      0
    ) || 0;

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
          i < currentRegDuration;
          i++
        ) {
          disabledTime[index - i] = false;
        }
      } else if (
        index === disabledTime.length - 1 &&
        currentRegDuration > 2
      ) {
        // блокируем время, чтобы окончание записи не было позднее 21:00
        for (
          let i = 0;
          i < currentRegDuration - 2;
          i++
        ) {
          disabledTime[index - i] = false;
        }
      }
    });

    return disabledTime;
  }

  function handleFormSubmit(values: {
    date: dayjs.Dayjs;
    time: string;
  }) {
    setIsCurrentRegLoading(true);

    dispatch(
      setFormValues({
        date: values.date.format(dateFormat),
        time: values.time,
      })
    );

    const regTimeList: string[] = [values.time];

    for (
      let i = 0;
      i < currentRegDuration - 1;
      i++
    ) {
      let time: string;
      if (values.time.slice(3, 4) === "0") {
        time =
          i % 2
            ? parseInt(regTimeList[i]) + 1 + ":00"
            : regTimeList[i].slice(0, 3) + "30";
      } else {
        time =
          i % 2
            ? regTimeList[i].slice(0, 3) + "30"
            : parseInt(regTimeList[i]) +
              1 +
              ":00";
      }

      regTimeList.push(time);
    }

    if (!isLoading) {
      addRegistration({
        userName: formValues.userName,
        phone: formValues.phone,
        categoryId: formValues.category?.id,
        serviceIdList: formValues.services?.map(
          (service) => service.id
        ),
        masterId: formValues.master?.id,
        date: values.date.toDate(),
        time: regTimeList,
      })
        .catch(() =>
          dispatch(setIsRegError(true))
        )
        .finally(() => {
          navigate(
            regPageRouteList[currentForm + 1]
          );

          dispatch(
            setCurrentForm(currentForm + 1)
          );

          setIsCurrentRegLoading(false);
        });
    }
  }

  return (
    <>
      <Spinner isVisible={isCurrentRegLoading} />
      {!isCurrentRegLoading && (
        <Form
          form={form}
          className="reg-form"
          name="date"
          initialValues={{
            date: dayjs().add(1, "day"),
          }}
          onFinish={handleFormSubmit}
          onFinishFailed={() =>
            window.scrollTo(
              0,
              document.body.scrollHeight
            )
          }
          layout={"vertical"}>
          <div className="reg-form__btn-group">
            <RegFormBackBtn />
            <RegFormNextBtn />
          </div>
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
                options={timeSelectOptions}
              />
            </Form.Item>
          </div>

          <p className="reg-form__caption">
            &nbsp; &mdash; недоступные для записи
            дата/время
          </p>
        </Form>
      )}
    </>
  );
}
