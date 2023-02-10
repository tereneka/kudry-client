import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { db, storage } from "../../db/firebaseConfig";
import { Category, Master, Service, SubCategory } from "../../types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Master", 'Category', "SubCategory", 'Photo', "Service"],
    endpoints: (builder) => ({
        getMasterList: builder.query<Master[], void>({
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
            providesTags: ["Master"],
        }),

        getCategoryList: builder.query<Category[], void>({
            async queryFn() {
                try {
                    const categoresQuery = query(collection(db, 'categores'), orderBy("index"));
                    const querySnaphot = await getDocs(categoresQuery);
                    let categores: any[] = [];
                    querySnaphot?.forEach((doc) => {
                        categores.push({ id: doc.id, ...doc.data() });
                    });
                    return { data: categores };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Category"],
        }),

        getSubCategoryList: builder.query<SubCategory[], string | void>({
            async queryFn(categoryId) {
                try {
                    let subCategoresQuery;
                    if (categoryId) {
                        subCategoresQuery = query(collection(db, 'subCategores'), where("categoryId", "==", categoryId));
                    } else {
                        subCategoresQuery = query(collection(db, 'subCategores'), orderBy("index"));
                    }

                    const querySnaphot = await getDocs(subCategoresQuery);
                    let subCategores: any[] = [];
                    querySnaphot?.forEach((doc) => {
                        subCategores.push({ id: doc.id, ...doc.data() });
                    });
                    return { data: subCategores };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["SubCategory"],
        }),

        getServiceList: builder.query<Service[], string | void>({
            async queryFn(categoryId) {
                try {
                    let servicesQuery;
                    if (categoryId) {
                        servicesQuery = query(collection(db, 'services'), where("categoryId", "==", categoryId));
                    } else {
                        servicesQuery = query(collection(db, 'services'), orderBy("index"));
                    }

                    const querySnaphot = await getDocs(servicesQuery);
                    let services: any[] = [];
                    querySnaphot?.forEach((doc) => {
                        services.push({ id: doc.id, ...doc.data() });
                    });
                    return { data: services };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Service"],
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

export const {
    useGetMasterListQuery,
    useGetCategoryListQuery,
    useGetSubCategoryListQuery,
    useGetServiceListQuery,
    useGetPhotoQuery,
    useGetPhotoListQuery
} = apiSlice;