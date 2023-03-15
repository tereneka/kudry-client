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

  return (
    <>
      <Error isVisible={!isSuccess} />

      {isSuccess && (
        <div className="reg-result">
          <p className="reg-result__title">
            {formValues.userName +
              ", Ваша запись оформлена:"}
          </p>

          <ul className="reg-result__list">
            <li className="reg-result__list-item">
              {formValues.category?.name + ":"}
              <ul className="reg-result__nested-list">
                {formValues.services?.map(
                  (service) => (
                    <li
                      className="reg-result__list-item"
                      key={service.id}>
                      {service.name}
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

          <p className="reg-result__title reg-result__title_decorated">
            ждём вас в&nbsp;&laquo;кудри&raquo;
          </p>
        </div>
      )}
    </>
  );
}
