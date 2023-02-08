import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { db, storage } from "../db/firebaseConfig";
import { Master } from "../types";
import { setStatus, setErrorMessage } from "./NotificationSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Master", 'Photo'],
    endpoints: (builder) => ({
        getMasters: builder.query<Master[], void>({
            async queryFn() {
                try {
                    const mastersQuery = query(collection(db, 'masters'), orderBy("index"));
                    const querySnaphot = await getDocs(mastersQuery);
                    let masters: any[] = [];
                    querySnaphot?.forEach((doc) => {
                        masters.push({ id: doc.id, ...doc.data() });
                    });
                    return { data: masters };
                } catch (error) {
                    return { error };
                }
            },
            // async onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     dispatch(setStatus({ status: 'loading', key: 'masters' }))
            //     try {
            //         const { data } = await queryFulfilled
            //         dispatch(setStatus({ status: 'idle', key: 'masters' }))
            //     } catch (err) {
            //         dispatch(setStatus({ status: 'failed', key: 'masters' }))
            //         dispatch(setErrorMessage(`Ошибка: ${err}`))
            //     }
            // },
            providesTags: ["Master"],
        }),

        getPhotoList: builder.query<string[], string>({
            async queryFn(path) {
                try {
                    const listRef = ref(storage, path);
                    const photosList = await listAll(listRef)
                    let urlsList: string[] = [];
                    photosList.items.forEach(async (item) => {
                        const photo = await getDownloadURL(ref(storage, item.fullPath));
                        urlsList.push(photo)
                    })
                    return { data: urlsList };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Photo"],
        }),

        getPhoto: builder.query<string, string>({
            async queryFn(path) {
                try {
                    const photoRef = ref(storage, path);
                    const url = await getDownloadURL(photoRef);
                    return { data: url };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Photo"],
        }),
    }),
});

export const { useGetMastersQuery, useGetPhotoQuery, useGetPhotoListQuery } = apiSlice;