import {
  createApi,
  fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  listAll,
  list,
  ListResult,
} from "firebase/storage";
import {
  db,
  storage,
} from "../../db/firebaseConfig";
import {
  Category,
  Master,
  Service,
  SubCategory,
} from "../../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    "Master",
    "Category",
    "SubCategory",
    "Photo",
    "Service",
  ],
  endpoints: (builder) => ({
    getMasterList: builder.query<Master[], void>({
      async queryFn() {
        try {
          const mastersQuery = query(
            collection(db, "masters"),
            orderBy("index")
          );
          const querySnaphot = await getDocs(
            mastersQuery
          );
          let masters: any[] = [];
          querySnaphot?.forEach((doc) => {
            masters.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: masters };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Master"],
    }),

    getCategoryList: builder.query<
      Category[],
      void
    >({
      async queryFn() {
        try {
          const categoresQuery = query(
            collection(db, "categores"),
            orderBy("index")
          );
          const querySnaphot = await getDocs(
            categoresQuery
          );
          let categores: any[] = [];
          querySnaphot?.forEach((doc) => {
            categores.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: categores };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Category"],
    }),

    getRegCategoryList: builder.query<
      Category[],
      void
    >({
      async queryFn() {
        try {
          const categoresQuery = query(
            collection(db, "categores"),
            where("regAvailable", "==", true)
          );
          const querySnaphot = await getDocs(
            categoresQuery
          );
          let categores: any[] = [];
          querySnaphot?.forEach((doc) => {
            categores.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return {
            data: categores.sort(
              (a, b) => a.index - b.index
            ),
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Category"],
    }),

    getSubCategoryList: builder.query<
      SubCategory[],
      string | void
    >({
      async queryFn(categoryId) {
        try {
          let subCategoresQuery;
          if (categoryId) {
            subCategoresQuery = query(
              collection(db, "subCategores"),
              where(
                "categoryId",
                "==",
                categoryId
              )
            );
          } else {
            subCategoresQuery = query(
              collection(db, "subCategores"),
              orderBy("index")
            );
          }

          const querySnaphot = await getDocs(
            subCategoresQuery
          );
          let subCategores: any[] = [];
          querySnaphot?.forEach((doc) => {
            subCategores.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return {
            data: subCategores.sort(
              (a, b) => a.index - b.index
            ),
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["SubCategory"],
    }),

    getServiceList: builder.query<
      Service[],
      string | void
    >({
      async queryFn(categoryId) {
        try {
          let servicesQuery;
          if (categoryId) {
            servicesQuery = query(
              collection(db, "services"),
              where(
                "categoryId",
                "==",
                categoryId
              )
            );
          } else {
            servicesQuery = query(
              collection(db, "services"),
              orderBy("index")
            );
          }

          const querySnaphot = await getDocs(
            servicesQuery
          );
          let services: any[] = [];
          querySnaphot?.forEach((doc) => {
            services.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return {
            data: services.sort(
              (a, b) => a.index - b.index
            ),
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Service"],
    }),

    getPhotoList: builder.query<
      string[][],
      {
        folderPath: string;
        numberPhotosPerPage: number;
      }
    >({
      async queryFn(args) {
        try {
          const listRef = ref(
            storage,
            args.folderPath
          );
          const photosList = await (
            await list(listRef)
          ).items.map((i) => i.fullPath);
          let data: any[] = [];

          for (
            let i = 0;
            i < photosList.length;
            i += args.numberPhotosPerPage
          ) {
            data.push(
              photosList.slice(
                i,
                i + args.numberPhotosPerPage
              )
            );
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Photo"],
    }),

    getPhoto: builder.query<
      string | undefined,
      string | void
    >({
      async queryFn(path) {
        if (path) {
          try {
            const photoRef = ref(storage, path);
            const url = await getDownloadURL(
              photoRef
            );
            return { data: url };
          } catch (error) {
            return { error };
          }
        } else return {};
      },
      providesTags: ["Photo"],
    }),

    // setRegistretion: builder.mutation,
  }),
});

export const {
  useGetMasterListQuery,
  useGetCategoryListQuery,
  useGetRegCategoryListQuery,
  useGetSubCategoryListQuery,
  useGetServiceListQuery,
  useGetPhotoQuery,
  useGetPhotoListQuery,
} = apiSlice;
