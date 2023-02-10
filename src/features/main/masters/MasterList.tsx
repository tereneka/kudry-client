import React, { useEffect } from 'react'
import { useGetMasterListQuery } from '../../api/apiSlise';
import { useAppDispatch } from '../../../store';
import MasterListItem from './MasterListItem';
import { setIsLoadingState } from '../content/ContentSlice';

export default function MasterList() {
    const { data: masters, isLoading, isError } = useGetMasterListQuery();
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
                {masters?.map((master, index) => {
                    return <MasterListItem master={master} key={master.id} />
                })}
            </div>
        </section>
    )
}


