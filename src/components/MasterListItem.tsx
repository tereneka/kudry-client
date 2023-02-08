import React from 'react'
import { useGetPhotoQuery } from '../slices/apiSlise'
import { Master } from '../types'

interface Props {
    master: Master
}

export default function MasterListItem({ master }: Props) {
    const { data: masterPhoto } = useGetPhotoQuery(master.photoLink);

    return (
        <div className="cards__item">
            <img className="cards__item-img" src={masterPhoto} alt="фото мастера" />
            <h4 className="cards__item-title">{master.name}</h4>
            <p className="cards__item-about">{master.profession}</p>
        </div>
    )
}