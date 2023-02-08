interface Master {
    id: string;
    categoryIdList: string[];
    name: string;
    profession: string;
    weekends: number[];
    disabledDates: string[];
    available: boolean;
    index: number;
    photoLink: string
}


export type { Master }

// export interface Category {
//     id: number;
//     name: string,
//     available: boolean,
//     hasGenders: boolean,
// }
// export interface SubCategory {
//     id: number,
//     name: string,
//     categoryId: number,
//     gender?: string | null,
//     available: boolean,
// }
// export interface Service {
//     id: number,
//     name: string,
//     price: number,
//     categoryId: number,
//     gender?: string | null,
//     subCategoryId?: number | null,
//     available: boolean,
// }

// export interface Date {
//     id: number,
//     date: string,
//     available: boolean,
//     masterId: number,
// }
// export interface Time {
//     id: number,
//     time: string,
//     available: boolean,
//     masterId: number,
//     dateId: number,
// }
// export interface MasterCategory {
//     id: number,
//     masterId: number,
//     categoryId: number,
// }
// export interface MasterSubCategory {
//     id: number,
//     gender?: string | null,
//     masterId: number,
//     subCategoryId: number,
// }
// export interface CurrentId {
//     id: number
// }