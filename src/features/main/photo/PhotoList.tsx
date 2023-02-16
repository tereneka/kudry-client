import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store';
import { useGetPhotoListQuery } from '../../api/apiSlise';
import { setOpenedPages } from './PhotoSlice';
import { nanoid } from 'nanoid';
import PhotoPage from './PhotoPage';

interface Props {
    title: string;
    folderPath: string
}

export default function PhotoList({ title, folderPath }: Props) {
    const { data: pageList, isLoading: isPageListLoading, isError: isPageListError } = useGetPhotoListQuery({ folderPath, numberPhotosPerPage: 8 });
    const titleContent = title.split('').map((char, index, arr) => {
        return (
            <span key={nanoid()}>
                {char}
                {index < arr.length - 1 && <br />}
            </span>
        )
    });
    const photoState = useAppSelector(state => state.photoState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!photoState.openedPages[folderPath]) {
            dispatch(setOpenedPages({ folderPath, lastOpenedPage: 1 }))
        }
    }, [pageList])

    function handleNextBtnClick() {
        dispatch(setOpenedPages({ folderPath, lastOpenedPage: photoState.openedPages[folderPath] + 1 }))
    }


    return (
        <section className="photo" id={folderPath}>
            <h3 className="section-title">{titleContent}</h3>

            {pageList?.map((photoPathList, index) => {
                return (
                    <PhotoPage
                        folderPath={folderPath}
                        pageNumber={index + 1}
                        photoPathList={photoPathList}
                        key={nanoid()}
                    />
                )
            })}

            {pageList && photoState.openedPages[folderPath] !== pageList.length &&
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
