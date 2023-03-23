import React, { createRef } from "react";
import MasterList from "../features/main-page/masters/MasterList";
import PhotoSection from "../features/main-page/photo/PhotoSection";
import Price from "../features/main-page/price/Price";
import DateForm from "../features/reg-page/registration/DateForm";
import MastersForm from "../features/reg-page/registration/MastersForm";
import RegistrationResult from "../features/reg-page/registration/RegistrationResult";
import ServicesForm from "../features/reg-page/registration/ServicesForm";
import UserInfoForm from "../features/reg-page/registration/UserInfoForm";

export const mainRoutes = [
  {
    path: "/",
    element: <MasterList />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "/price",
    element: <Price />,
  },
  {
    path: "/interior",
    element: (
      <PhotoSection
        title="интерьер"
        folderPath="interiors"
      />
    ),
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "/works",
    element: (
      <PhotoSection
        title="работы"
        folderPath="works"
      />
    ),
    nodeRef: createRef<HTMLDivElement>(),
  },
];

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
