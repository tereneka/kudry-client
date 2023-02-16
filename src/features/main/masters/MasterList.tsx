import React, { useEffect } from 'react'
import { useGetMasterListQuery } from '../../api/apiSlise';
import { useAppDispatch } from '../../../store';
import MasterListItem from './MasterListItem';
import { setIsLoadingState } from '../content/ContentSlice';

export default function MasterList() {
    const { data: masters, isLoading, isError } = useGetMasterListQuery();
    const dispatch = useAppDispatch();
    const cardsWrapperElement: HTMLDivElement | null = document.querySelector(".cards__wrapper");
    let cardItemElementList: NodeListOf<HTMLDivElement> | null = cardsWrapperElement ?
        cardsWrapperElement.querySelectorAll(".cards__item") : null;
    let cardItemElementWidth = 0;

    function resizeCardsSection() {
        if (masters && masters?.length * cardItemElementWidth < window.innerWidth * 0.8) {
            cardsWrapperElement?.classList.add('cards__wrapper_fullwidth')
            cardItemElementList?.forEach(cardItemElemen => {
                cardItemElemen.classList.add('cards__item_fullwidth')
            })
        } else {
            cardsWrapperElement?.classList.remove('cards__wrapper_fullwidth')
            cardItemElementList?.forEach(cardItemElemen => {
                cardItemElemen.classList.remove('cards__item_fullwidth')
            })
        }
    }

    useEffect(() => {
        dispatch(setIsLoadingState({
            isLoading, isError, key: 'masterList'
        }))
    }, [isLoading, isError])

    useEffect(() => {
        cardItemElementList = cardsWrapperElement ? cardsWrapperElement.querySelectorAll(".cards__item") : null;
    }, [masters])

    useEffect(() => {
        cardItemElementWidth = cardItemElementList && cardItemElementList[0] ? cardItemElementList[0].clientWidth : 0
        resizeCardsSection()
    }, [cardItemElementList])

    window.addEventListener('resize', resizeCardsSection)

    return (
        <section className="cards" id="team">
            <h3 className="section-title">к<br />о<br />м<br />а<br />н<br />д<br />а</h3>
            <div className="cards__wrapper">
                {masters?.map(master => {
                    return <MasterListItem master={master} key={master.id} />
                })}
            </div>
        </section>
    )
}


