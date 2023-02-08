import React from 'react'
import { useGetMastersQuery } from '../slices/apiSlise';
import MasterListItem from './MasterListItem';

export default function MasterList() {
    const { data: masters } = useGetMastersQuery()
    console.log(masters);

    return (
        <section className="cards" id="team">
            <h3 className="section-title">к<br />о<br />м<br />а<br />н<br />д<br />а</h3>
            <div className="cards__wrapper">
                {masters?.map(master => <MasterListItem master={master} key={master.id} />)}
            </div>
        </section>
    )
}


