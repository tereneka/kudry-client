import React, { useEffect } from 'react'
import { useGetMastersQuery } from '../slices/apiSlise';
import { setIsLoadingState } from '../slices/LoadingState';
import { useAppDispatch } from '../store';
import MasterListItem from './MasterListItem';

export default function MasterList() {
    const { data: masters, isLoading, isError } = useGetMastersQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoadingState({
            isLoading, isError, key: 'masterList'
        }))
    }, [isLoading, isError])


    return (
        <section className="cards" id="team">
            <h3 className="section-title">к<br />о<br />м<br />а<br />н<br />д<br />а</h3>
            <div className="cards__wrapper">
                {masters?.map(master => <MasterListItem master={master} key={master.id} />)}
            </div>
        </section>
    )
}


