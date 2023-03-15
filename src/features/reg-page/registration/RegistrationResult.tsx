import React from "react";
import Error from "../../../components/Error";
import { useAppSelector } from "../../../store";

export default function RegistrationResult() {
  const formValues = useAppSelector(
    (state) => state.regState.formValues
  );

  const isError = useAppSelector(
    (state) => state.regState.isRegError
  );

  const isSuccess = !!(!isError && formValues.id);
  console.log(formValues);

  return (
    <>
      <Error isVisible={!isSuccess} />

      {isSuccess && (
        <div className="reg-result">
          <p className="reg-result__title">
            {formValues.userName +
              ", Ваша запись успешно оформлена:"}
          </p>

          <ul className="reg-result__list">
            {/* <li className="reg-result__list-item">
              {formValues.category?.name +
                " - " +
                formValues.services
                  ?.map((service) => service.name)
                  .join(", ")}
            </li> */}
            <li className="reg-result__list-item">
              {formValues.category?.name + ":"}
              <ul>
                {formValues.services?.map(
                  (service) => (
                    <li className="reg-result__list-item">
                      {service.name.toLowerCase()}
                    </li>
                  )
                )}
              </ul>
            </li>
            <li className="reg-result__list-item">
              {"мастер - " +
                formValues.master?.name}
            </li>
            <li className="reg-result__list-item">
              {"дата - " + formValues.date}
            </li>
            <li className="reg-result__list-item">
              {"время - " + formValues.time}
            </li>
          </ul>

          <p className="reg-result__title reg-result__title_xxx">
            ЖДЁМ ВАС В&nbsp;&laquo;КУДРИ&raquo;
          </p>
        </div>
      )}
    </>
  );
}
