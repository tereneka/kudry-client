import React, { useEffect, useRef } from "react";
import {
  useGetServiceListQuery,
  useGetSubCategoryListQuery,
} from "../../api/apiSlise";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { Category } from "../../../types";
import { setIsCategoryOpened } from "./PriceSlice";

interface Props {
  category: Category;
}

export default function PriceCategoryItem({
  category,
}: Props) {
  const {
    data: subCategores,
    isLoading: isSubCategoresLoading,
    isError: isSubCategoresError,
  } = useGetSubCategoryListQuery(category.id);
  const {
    data: services,
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useGetServiceListQuery(category.id);
  const isCategoryOpened =
    useAppSelector(
      (state) => state.priceState.isCategoryOpened
    ) === category.id;
  const dispatch = useAppDispatch();
  let serviceListElement: JSX.Element = <></>;
  const toggleBtnClass = `price__toggle-btn ${
    isCategoryOpened
      ? "price__toggle-btn_opened"
      : ""
  }`;
  const tableRef = useRef<HTMLTableElement>(null);
  const tableElement = tableRef.current;
  const priceTableStyle = {
    height: isCategoryOpened
      ? tableElement?.scrollHeight
      : 0,
  };

  if (subCategores && subCategores.length > 0) {
    serviceListElement = (
      <>
        {[...subCategores]?.map(
          (sub, subIndex, subArr) => {
            return services
              ?.filter(
                (service) =>
                  service.subCategoryId === sub.id
              )
              .map(
                (
                  service,
                  serviceIndex,
                  serviceArr
                ) => {
                  return (
                    <tr
                      className={`price__row 
                                            ${
                                              serviceIndex ===
                                                serviceArr.length -
                                                  1 &&
                                              subIndex !==
                                                subArr.length -
                                                  1
                                                ? "price__row price__row_underlined"
                                                : ""
                                            }`}
                      key={service.id}>
                      <td className="price__cell">
                        {service.name}
                      </td>
                      <td className="price__cell">
                        {service.price}
                      </td>
                    </tr>
                  );
                }
              );
          }
        )}
      </>
    );
  } else if (services) {
    serviceListElement = (
      <>
        {[...services]
          ?.sort((a, b) => a.index - b.index)
          .map((service, index, arr) => {
            return (
              <tr
                className="price__row"
                key={service.id}>
                <td className="price__cell">
                  {service.name}
                </td>
                <td className="price__cell">
                  {service.price}
                </td>
              </tr>
            );
          })}
      </>
    );
  }

  function handleToggleBtnClick() {
    dispatch(
      setIsCategoryOpened(
        toggleBtnClass.includes(
          "price__toggle-btn_opened"
        )
          ? ""
          : category.id
      )
    );
  }

  return (
    <>
      <div className="price__table-caption-container">
        <h4 className="price__table-caption">
          {category.name}
        </h4>
        <button
          className={toggleBtnClass}
          type="button"
          aria-label="открытие и закрытие прайса"
          onClick={handleToggleBtnClick}></button>
      </div>
      <table
        className="price__table"
        ref={tableRef}
        style={priceTableStyle}>
        <tbody>{serviceListElement}</tbody>
      </table>
    </>
  );
}
