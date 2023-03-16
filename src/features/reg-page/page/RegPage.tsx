import React from "react";
import {
  useLocation,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import { dateFormat } from "../../../constants";
import { registrationRoutes } from "../../../router/routes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  useAddRegistrationMutation,
  useGetMasterListQuery,
  useGetRegCategoryListQuery,
  useGetRegistrationAfterTodayListQuery,
} from "../../api/apiSlise";
import Header from "../header/Header";
import "./reg.css";
import dayjs from "dayjs";
import { Form } from "antd";
import RegFormBackBtn from "../registration/RegFormBackBtn";
import RegFormNextBtn from "../registration/RegFormNextBtn";
import {
  setCurrentRegistrationPage,
  setFormValues,
  setIsRegError,
  setIsRegistrationLoading,
} from "../registration/RegistrationSlice";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";

export default function RegPage() {
  const location = useLocation().pathname;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    data: categores,
    isLoading: isCategoresLoading,
    isError: isCategoresError,
  } = useGetRegCategoryListQuery();

  const {
    data: masters,
    isLoading: isMastersLoading,
    isError: isMastersError,
  } = useGetMasterListQuery();

  const {
    data: registrationList,
    isLoading: isRegListLoading,
    isError: isRegListError,
  } = useGetRegistrationAfterTodayListQuery();

  const currentOutlet = useOutlet({
    categores,
    masters,
    registrationList,
    getRegistrationDuration,
  });

  const [form] = Form.useForm();

  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const currentRegistrationPage = useAppSelector(
    (state) =>
      state.regState.currentRegistrationPage
  );

  const filtredMasters = useAppSelector(
    (state) => state.regState.filtredMasters
  );

  const [
    addRegistration,
    { isLoading: isAddRegistrationLoading },
  ] = useAddRegistrationMutation();

  const { nodeRef } =
    registrationRoutes.find(
      (route) => route.path === location
    ) ?? {};

  const registrationFormList = [
    {
      name: "userInfo",
      initialValues: {
        userName: formValues.userName,
        phone: formValues.phone.slice(2),
      },
      onFinish: handleUserInfoFormSubmit,
      isLoading: false,
      isError: false,
    },
    {
      name: "services",
      initialValues: {
        category:
          formValues.category?.id ||
          (categores && categores[0].id),
        services: formValues.services?.map(
          (service) => service.id
        ),
        durationIndex: formValues.durationIndex,
      },
      onFinish: handleServicesFormSubmit,
      isLoading: isCategoresLoading,
      isError: isCategoresError || !categores,
    },
    {
      name: "master",
      initialValues: {
        master: formValues.master?.id,
      },
      onFinish: () => {},
      isLoading: isMastersLoading,
      isError: isMastersError || !masters,
    },
    {
      name: "date",
      initialValues: {
        date: dayjs().add(1, "day"),
      },
      onFinish: handleDateFormSubmit,
      isLoading: isRegListLoading,
      isError: isRegListError || !masters,
    },
  ];

  function getRegistrationDuration() {
    const res =
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

    return res;
  }

  function handleUserInfoFormSubmit(values: {
    userName: string;
    phone: string;
  }) {
    dispatch(
      setFormValues({
        userName: values.userName,
        phone: `+7${values.phone}`,
      })
    );
  }

  function handleServicesFormSubmit(values: {
    category: string;
    services: string[];
    durationIndex: number;
  }) {
    const master =
      filtredMasters && filtredMasters.length < 2
        ? filtredMasters[0]
        : undefined;

    dispatch(
      setFormValues({
        category: categores?.find(
          (category) =>
            category.id === values.category
        ),
        durationIndex: values.durationIndex || 0,
        master: master,
      })
    );
  }

  function handleDateFormSubmit(values: {
    date: dayjs.Dayjs;
    time: string;
  }) {
    const registrationDuration =
      getRegistrationDuration();

    dispatch(setIsRegistrationLoading(true));

    dispatch(
      setFormValues({
        date: values.date.format(dateFormat),
        time: values.time,
      })
    );

    const regTimeList: string[] = [values.time];

    for (
      let i = 0;
      i < registrationDuration - 1;
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

    if (!isAddRegistrationLoading) {
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
          dispatch(
            setIsRegistrationLoading(false)
          );
        });
    }
  }

  function handleFormSubmit(
    values: {
      userName: string;
      phone: string;
    } & {
      category: string;
      services: string[];
      durationIndex: number;
    } & { date: dayjs.Dayjs; time: string }
  ) {
    // если мастеров в выбранной категории меньше двух пропускаем форму выбора мастера
    const n =
      location.endsWith("services") &&
      filtredMasters &&
      filtredMasters?.length < 2
        ? 2
        : 1;

    navigate(
      registrationRoutes[
        currentRegistrationPage + n
      ].path
    );

    dispatch(
      setCurrentRegistrationPage(
        currentRegistrationPage + n
      )
    );

    registrationFormList[
      currentRegistrationPage
    ].onFinish(values);
  }

  window.addEventListener("load", () => {
    navigate(
      `/online-reg/${registrationRoutes[0].path}`
    );
  });

  return (
    <>
      <Header />
      <main>
        <SwitchTransition>
          <CSSTransition
            key={location}
            nodeRef={nodeRef}
            timeout={300}
            classNames="reg-page"
            unmountOnExit>
            {() => (
              <div ref={nodeRef} className="page">
                {currentRegistrationPage <
                registrationRoutes.length - 1 ? (
                  <>
                    <Spinner
                      isVisible={
                        registrationFormList[
                          currentRegistrationPage
                        ].isLoading
                      }
                    />

                    <Error
                      isVisible={
                        registrationFormList[
                          currentRegistrationPage
                        ].isError
                      }
                    />

                    {!registrationFormList[
                      currentRegistrationPage
                    ].isError &&
                      !registrationFormList[
                        currentRegistrationPage
                      ].isLoading && (
                        <Form
                          form={form}
                          className="reg-form"
                          name={
                            registrationFormList[
                              currentRegistrationPage
                            ].name
                          }
                          initialValues={
                            registrationFormList[
                              currentRegistrationPage
                            ].initialValues
                          }
                          onFinish={
                            handleFormSubmit
                          }
                          onFinishFailed={() =>
                            window.scrollTo(
                              0,
                              document.body
                                .scrollHeight
                            )
                          }
                          layout={"vertical"}>
                          <div className="reg-form__btn-group">
                            <RegFormBackBtn />
                            <RegFormNextBtn />
                          </div>

                          {currentOutlet}
                        </Form>
                      )}
                  </>
                ) : (
                  currentOutlet
                )}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>
    </>
  );
}
