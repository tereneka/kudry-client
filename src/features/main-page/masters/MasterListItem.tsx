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
    const cardsItemRef = useRef<HTMLDivElement>(null);
    const cardsItemElement = cardsItemRef.current;
    const dispatch = useAppDispatch();
    const cardsItemClass = `cards__item ${isFullWidthStyle ? 'cards__item_fullwidth' : ''}`;

    useEffect(() => {
        if (cardsItemElement) {
            dispatch(setCardItemElementWidth(cardsItemElement.clientWidth))
        }
    })

    useEffect(() => {
        dispatch(setContentLoadingState({
            isLoading, isError, key: 'masterPhotoUrl'
        }))
    }, [isLoading, isError])

    return (
        <div className={cardsItemClass} ref={cardsItemRef}>
            <img className="cards__item-img" src={masterPhotoUrl} alt="фото мастера" />
            <h4 className="cards__item-title">{master.name}</h4>
            <p className="cards__item-about">{master.profession}</p>
        </div>
    )
}