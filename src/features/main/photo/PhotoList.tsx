import { ref, listAll, getDownloadURL } from 'firebase/storage';
import path from 'path';
import React, { useEffect, useState } from 'react'
import { storage } from '../../../db/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useGetPhotoListQuery, useGetPhotoQuery } from '../../api/apiSlise';
import { setIsLoadingState } from '../content/ContentSlice';
import PhotoListItem from './PhotoListItem';
import { setOpenedPages } from './PhotoSlice';

interface Props {
    title: string;
    photoFolderPath: string
}

export default function PhotoList({ title, photoFolderPath }: Props) {
    const { data, isLoading, isError } = useGetPhotoListQuery({ folderPath: photoFolderPath, numberPhotosPerPage: 8 });
    const titltContent = title.split('').map((char, index, arr) => {
        return (
            <>
                <span>{char}</span>
                {index < arr.length - 1 && <br />}
            </>
        )
    });
    const openedPages = useAppSelector(state => state.photoState.openedPages);
    const photoGridClass = (index: number) => {
        return index + 1 <= openedPages[photoFolderPath] ?
            'photo__grid photo__grid_opened'
            :
            'photo__grid'
    };
    const photoPath = (index: number, path: string) => {
        return index + 1 <= openedPages[photoFolderPath] ?
            path
            :
            undefined
    };
    console.log(data);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!openedPages[photoFolderPath]) {
            dispatch(setOpenedPages({ folderPath: photoFolderPath, lastOpenedPage: 1 }))
        }
    }, [data])

    function handleNextBtnClick() {

    }


    return (
        <section className="photo" id={photoFolderPath}>
            <h3 className="section-title">{titltContent}</h3>

            {data?.map((photoPathList, index) => {
                return (
                    <div className={photoGridClass(index)} key={index}>
                        {photoPathList.map(path => {
                            return <PhotoListItem photoPath={photoPath(index, path)} key={path} />
                        })}
                    </div>)
            })}

            {data && data.length > 1 &&
                <button
                    className='photo__next-btn'
                    type='button'
                    onClick={handleNextBtnClick}
                >
                    ещё фотографии
                </button>
            }
        </section>
    )
}
