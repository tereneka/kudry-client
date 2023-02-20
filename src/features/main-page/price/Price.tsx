import React, { useEffect } from 'react'
import { useGetCategoryListQuery } from '../../api/apiSlise'
import { useAppDispatch, useAppSelector } from '../../../store';
import PriceCategoryItem from './PriceCategoryItem';
import { setContentLoadingState } from '../content/ContentSlice';
import { setCategoryVisibility } from './PriceSlice';

export default function Price() {
    const { data: categores, isLoading, isError } = useGetCategoryListQuery();
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(setContentLoadingState({
            isLoading, isError, key: 'categoryList'
        }))
    }, [isLoading, isError])

    useEffect(() => {
        categores?.forEach(category => {
            dispatch(setCategoryVisibility({ id: category.id, isOpened: false }))
        })
    }, [categores])

    return (
        <section className="price" id="price">
            <h3 className="section-title">ц<br />е<br />н<br />ы</h3>
            {categores?.map(category => {
                return <PriceCategoryItem category={category} key={category.id} />
            })}
        </section>
    )
}
