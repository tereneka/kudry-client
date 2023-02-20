import React, { useEffect, useRef } from 'react'
import { useGetPhotoQuery } from '../../api/apiSlise'
import { useAppDispatch, useAppSelector } from '../../../store';
import { Master } from '../../../types'
import { setContentLoadingState } from '../content/ContentSlice';
import { setCardItemElementWidth } from './MasterSlice';

interface Props {
    master: Master;
}

export default function MasterListItem({ master }: Props) {
    const { data: masterPhotoUrl, isLoading, isError } = useGetPhotoQuery(master.photoLink);
    const isFullWidthStyle = useAppSelector(state => state.masterState.isFullWidthStyle);
    const cardsItemElement = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const cardsItemClass = `cards__item ${isFullWidthStyle ? 'cards__item_fullwidth' : ''}`;

    useEffect(() => {
        if (cardsItemElement.current) {
            dispatch(setCardItemElementWidth(cardsItemElement.current.clientWidth))
        }
    })

    useEffect(() => {
        dispatch(setContentLoadingState({
            isLoading, isError, key: 'masterPhotoUrl'
        }))
    }, [isLoading, isError])

    return (
        <div className={cardsItemClass} ref={cardsItemElement}>
            <img className="cards__item-img" src={masterPhotoUrl} alt="фото мастера" />
            <h4 className="cards__item-title">{master.name}</h4>
            <p className="cards__item-about">{master.profession}</p>
        </div>
    )
}