import { Button as button, Form } from "antd";
import React from "react";
import { useAppSelector } from "../../../store";

// interface Props {
//   isDisabled: boolean;
// }

// export default function RegFormSubmitBtn({
//   isDisabled,
// }: Props) {
//   const form = Form.useFormInstance();
//   const selectedServices = useAppSelector(
//     (state) => state.regState.selectedServices
//   );
//   const filtredMastersByCategory = useAppSelector(
//     (state) => state.regState.filtredMasters
//   );

// function handleFormSubmit() {
//   // индекс длительности услуги в массиве в базе данных
//   // соответствует value поля формы длины волос для
//   // парикмахерских услуг, для остальных категорий услуг
//   //  и мужской стрижки индекс = 0
//   const durationIndex: number | undefined =
//     form.getFieldValue("hairLength");
//   const duration = selectedServices
//     ? selectedServices.reduce(
//         (sum, currentService) => {
//           const currentValue =
//             currentService.duration.length > 1
//               ? currentService.duration[
//                   durationIndex
//                     ? durationIndex
//                     : 0
//                 ]
//               : currentService.duration[0];
//           return sum + currentValue;
//         },
//         0
//       )
//     : 0;
//   const startTime: string =
//     form.getFieldValue("time");
//   const timeList: string[] = [startTime];

//   for (let i = 0; i < duration - 1; i++) {
//     let time: string;
//     if (startTime.slice(3) === "0") {
//       time =
//         i % 2
//           ? parseInt(timeList[i]) + 1 + ":00"
//           : timeList[i].slice(0, 3) + "30";
//     } else {
//       time =
//         i % 2
//           ? timeList[i].slice(0, 3) + "30"
//           : parseInt(timeList[i]) + 1 + ":00";
//     }

//     timeList.push(time);
//   }

//   const result = {
//     categoryId: form.getFieldValue("category"),
//     serviceIdList: form.getFieldValue("services"),
//     masterId:
//       form.getFieldValue("master") ||
//       (filtredMastersByCategory &&
//         filtredMastersByCategory[0].id),
//     date: form.getFieldValue("date"),
//     timeList,
//   };
//   console.log(result);
// }

//   return (
//     <button
//       className={`btn btn_size_m ${
//         isDisabled ? "btn_disabled" : ""
//       } reg-form__btn reg-form__btn_position_right`}
//       type="submit"
//       disabled={isDisabled}
//       form="registration"
//       onClick={handleFormSubmit}>
//       отправить
//     </button>
//   );
// }
