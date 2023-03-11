import React from "react";
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
import { setFormValues } from "./RegistrationSlice";
import {
  useAddRegistrationMutation,
  useGetRegistrationAfterTodayListQuery,
} from "../../api/apiSlise";
import { services } from "../../../db/initialDbData";
import { dateFormat } from "../../../constants";
import { log } from "console";

export default function DateForm() {
  const [form] = Form.useForm();

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

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
  const masterDateList: {
    [key: string]: string[];
  } = {};
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
  console.log(masterDateList);

  // console.log(new Date().getUTCDate());
  // console.log(
  //   dayjs("12.03.2023", dateFormat).format(
  //     dateFormat
  //   )
  // );
  // console.log(Object.keys(masterDateList));

  dayjs.extend(customParseFormat);
  const disabledDate: RangePickerProps["disabledDate"] =
    (current) => {
      return (
        (current &&
          current < dayjs().endOf("day")) ||
        masterDisabledDate.some(
          (date) =>
            date === current.format(dateFormat)
        )
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

  const duration = formValues.services
    ? formValues.services.reduce(
        (sum, currentService) => {
          const currentValue =
            currentService.duration.length > 1 &&
            formValues.durationIndex
              ? currentService.duration[
                  formValues.durationIndex
                ]
              : currentService.duration[0];
          return sum + currentValue;
        },
        0
      )
    : 0;

  const dispatch = useAppDispatch();

  const [addRegistration, { isLoading }] =
    useAddRegistrationMutation();

  // const disabledTime: string[] = [];

  // timeList.forEach((time) => {
  //   if (isTimeDisabled(time)) {
  //     disabledTime.push(time);
  //   }
  // });
  const disabledTime = timeList.map((time) => {
    return masterDateList[
      selectedDate?.format(dateFormat)
    ]?.includes(time)
      ? false
      : true;
  });
  disabledTime.forEach((time, index) => {
    if (!time) {
      for (let i = 1; i < duration; i++) {
        disabledTime[index - i] = false;
      }
    }
  });
  disabledTime.forEach((time, index) => {
    if (index + duration > 19) {
      for (
        let i = 1;
        i < disabledTime.length - index;
        i++
      ) {
        disabledTime[index + i] = false;
      }
    }
  });
  console.log(disabledTime);

  function isTimeDisabled(time: string) {
    return (
      !!masterDateList[
        selectedDate?.format(dateFormat)
      ] &&
      masterDateList[
        selectedDate?.format(dateFormat)
      ].includes(time)
    );
  }

  function handleFormSubmit(values: {
    date: dayjs.Dayjs;
    time: string;
  }) {
    dispatch(
      setFormValues({
        date: values.date.format(dateFormat),
        time: values.time,
      })
    );

    // const duration = formValues.services
    //   ? formValues.services.reduce(
    //       (sum, currentService) => {
    //         const currentValue =
    //           currentService.duration.length >
    //             1 && formValues.durationIndex
    //             ? currentService.duration[
    //                 formValues.durationIndex
    //               ]
    //             : currentService.duration[0];
    //         return sum + currentValue;
    //       },
    //       0
    //     )
    //   : 0;

    const timeList: string[] = [values.time];

    for (let i = 0; i < duration - 1; i++) {
      let time: string;
      if (values.time.slice(3, 4) === "0") {
        time =
          i % 2
            ? parseInt(timeList[i]) + 1 + ":00"
            : timeList[i].slice(0, 3) + "30";
      } else {
        time =
          i % 2
            ? timeList[i].slice(0, 3) + "30"
            : parseInt(timeList[i]) + 1 + ":00";
      }

      timeList.push(time);
    }

    if (!isLoading) {
      addRegistration({
        categoryId: formValues.category?.id,
        serviceIdList: formValues.services?.map(
          (service) => service.id
        ),
        masterId: formValues.master?.id,
        date: values.date.toDate(),
        time: timeList,
      });
    }

    console.log({
      categoryId: formValues.category?.id,
      serviceIdList: formValues.services?.map(
        (service) => service.id
      ),
      masterId: formValues.master?.id,
      date: values.date.toDate(),
      time: timeList,
    });
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
          options={timeList.map((time, index) => {
            return {
              value: time,
              label: time,
              disabled: !disabledTime[index],
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
