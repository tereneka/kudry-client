import React, { createRef } from "react";
import DateForm from "../features/reg-page/registration/DateForm";
import MastersForm from "../features/reg-page/registration/MastersForm";
import RegistrationResult from "../features/reg-page/registration/RegistrationResult";
import ServicesForm from "../features/reg-page/registration/ServicesForm";
import UserInfoForm from "../features/reg-page/registration/UserInfoForm";

export const registrationRoutes = [
  {
    path: "contacts",
    element: <UserInfoForm />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "services",
    element: <ServicesForm />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "masters",
    element: <MastersForm />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "date",
    element: <DateForm />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "result",
    element: <RegistrationResult />,
    nodeRef: createRef<HTMLDivElement>(),
  },
];
