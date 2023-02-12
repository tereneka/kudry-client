import React, { useEffect } from 'react'
import { useGetServiceListQuery, useGetSubCategoryListQuery } from '../../api/apiSlise';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Category } from '../../../types'
import { setIsLoadingState } from '../content/ContentSlice';
import { toggleCategoryVisibility } from './PriceSlice';

interface Props {
    category: Category;
}

export default function PriceCategoryItem({ category }: Props) {
    const { data: subCategores, isLoading: isSubCategoresLoading, isError: isSubCategoresError } = useGetSubCategoryListQuery(category.id);
    const { data: services, isLoading: isServicesLoading, isError: isServicesError } = useGetServiceListQuery(category.id);
    const categoryVisibility = useAppSelector(state => state.priceState)
        .categoryListVisibility
        .find(i => i.id === category.id)
    const dispatch = useAppDispatch();
    let serviceListElement: JSX.Element = <></>;
    const toggleBtnClass = categoryVisibility?.isOpened ?
        "price__toggle-btn price__toggle-btn_opened"
        :
        "price__toggle-btn";
    const priceTableElement: HTMLTableElement | null = document.querySelector(`#${category.id}`);
    const priceTableStyle = categoryVisibility?.isOpened ?
        { height: priceTableElement?.scrollHeight }
        :
        { height: 0 }
    const tableCaptionElement: HTMLHeadingElement | null = document.querySelector('.price__table-caption-container')

    useEffect(() => {
        dispatch(setIsLoadingState({
            isLoading: isSubCategoresLoading, isError: isSubCategoresError, key: 'subCategoryList'
        }))
    }, [isSubCategoresLoading, isSubCategoresError])

    useEffect(() => {
        dispatch(setIsLoadingState({
            isLoading: isServicesLoading, isError: isServicesError, key: 'serviceList'
        }))
    }, [isServicesLoading, isServicesError])


    if (subCategores && subCategores.length > 0) {
        serviceListElement = (
            <>
                {
                    [...subCategores]?.sort((a, b) => a.index - b.index)
                        .map((sub, subIndex, subArr) => {
                            return services?.filter(service => service.subCategoryId === sub.id)
                                .sort((a, b) => a.index - b.index)
                                .map((service, serviceIndex, serviceArr) => {

                                    return (
                                        <tr
                                            className={((serviceIndex === serviceArr.length - 1) && (subIndex !== subArr.length - 1)
                                                ? 'price__row price__row_underlined'
                                                : 'price__row')}
                                            key={service.id}
                                        >
                                            <td className="price__cell" >{service.name}</td>
                                            <td className="price__cell">{service.price}</td>
                                        </tr>
                                    )
                                })
                        })
                }
            </>
        )
    } else if (services) {
        serviceListElement = (
            <>
                {[...services]?.sort((a, b) => a.index - b.index)
                    .map((service, index, arr) => {
                        return (
                            <tr className='price__row' key={service.id}>
                                <td className="price__cell">{service.name}</td>
                                <td className="price__cell">{service.price}</td>
                            </tr>
                        )
                    })
                }
            </>
        )
    }

    function handleToggleBtnClick() {
        dispatch(toggleCategoryVisibility({ id: category.id }))
        if (priceTableElement && tableCaptionElement) {
            const tableCaptionStyle = window.getComputedStyle(tableCaptionElement);
            window.scrollTo({
                top: priceTableElement?.offsetTop - tableCaptionElement?.clientHeight - parseInt(tableCaptionStyle.marginBottom),
                behavior: 'smooth'
            })
        }
    }

    return (
        <>
            <div className="price__table-caption-container">
                <h4 className="price__table-caption">{category.name}</h4>
                <button
                    className={toggleBtnClass}
                    type="button"
                    aria-label="открытие и закрытие прайса"
                    onClick={handleToggleBtnClick}
                >
                </button>
            </div>
            <table
                className="price__table"
                id={category.id}
                style={priceTableStyle}
            >
                <tbody>
                    {serviceListElement}
                </tbody>
            </table>
        </>
    )
}
