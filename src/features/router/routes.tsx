import React, { createRef } from "react";
import DateForm from "../registration/DateForm";
import MastersForm from "../registration/MastersForm";
import RegistrationResult from "../registration/RegistrationResult";
import ServicesForm from "../registration/ServicesForm";
import UserInfoForm from "../registration/UserInfoForm";

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
