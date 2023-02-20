import React, { useEffect, useState } from 'react'
import { useGetMasterListQuery } from '../../api/apiSlise';
import { useAppDispatch, useAppSelector } from '../../../store';
import MasterListItem from './MasterListItem';
import { setContentLoadingState } from '../content/ContentSlice';
import { setIsFullWidthStyle } from './MasterSlice';

export default function MasterList() {
    const { data: masters, isLoading, isError } = useGetMasterListQuery();
    const masterState = useAppSelector(state => state.masterState);
    const dispatch = useAppDispatch();
    const cardsWrapperClass = `cards__wrapper ${masterState.isFullWidthStyle ? 'cards__wrapper_fullwidth' : ''}`

    function resizeCardsSection() {
        if (masters) {
            dispatch(setIsFullWidthStyle(masters.length * masterState.cardItemElementWidth < window.innerWidth * 0.8))
        }
    }

    useEffect(() => {
        dispatch(setContentLoadingState({
            isLoading, isError, key: 'masterList'
        }))
    }, [isLoading, isError])


    useEffect(() => {
        resizeCardsSection()
    }, [masterState.cardItemElementWidth])

    window.addEventListener('resize', resizeCardsSection)

    return (
        <section className="cards" id="team">
            <h3 className="section-title">к<br />о<br />м<br />а<br />н<br />д<br />а</h3>
            <div className={cardsWrapperClass}>
                {masters?.map(master => {
                    return <MasterListItem master={master} key={master.id} />
                })}
            </div>
        </section>
    )
}


