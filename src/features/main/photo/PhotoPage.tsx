import { nanoid } from 'nanoid';
import React from 'react'
import Spinner from '../../../components/Spinner';
import Error from '../../../components/Error'
import { useAppSelector } from '../../../store';
import PhotoListItem from './PhotoListItem';

interface Props {
    folderPath: string;
    pageNumber: number;
    photoPathList: string[]
}

export default function PhotoPage({ folderPath, pageNumber, photoPathList }: Props) {
    const photoState = useAppSelector(state => state.photoState);
    const isPageLoading = photoState.isLoading[folderPath] && photoState.isLoading[folderPath][pageNumber]
        ?
        Object.values(
            photoState.isLoading[folderPath][pageNumber]
        ).some(i => i === true)
        :
        true;

    const isPageError = photoState.isError[folderPath] && photoState.isError[folderPath][pageNumber]
        ?
        Object.values(
            photoState.isError[folderPath][pageNumber]
        ).some(i => i === true)
        :
        true;
    const photoGridClass = pageNumber <= photoState.openedPages[folderPath] && !isPageLoading && !isPageError
        ?
        'photo__grid photo__grid_opened'
        :
        'photo__grid';

    const photoPath = (path: string) => {
        return pageNumber <= photoState.openedPages[folderPath] ?
            path
            :
            undefined
    };

    console.log(isPageLoading);

    return (
        <>
            <Spinner isVisible={isPageLoading} />
            <Error isVisible={isPageError} />
            <div className={photoGridClass} key={nanoid()}>
                {photoPathList.map(path => {
                    return <PhotoListItem
                        photoPath={photoPath(path)}
                        folderPath={folderPath}
                        pageNumber={pageNumber.toString()}
                        key={path} />
                })}
            </div>
        </>

    )
}
