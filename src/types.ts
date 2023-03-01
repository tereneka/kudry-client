interface Master {
  id: string;
  categoryIdList: string[];
  name: string;
  profession: string;
  weekends: number[];
  disabledDates: string[];
  photoLink: string;
  index: number;
  available: boolean;
  regAvailable: boolean;
}

interface Category {
  id: string;
  name: string;
  hasSubCategores: boolean;
  index: number;
  available: boolean;
  regAvailable: boolean;
}

interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  index: number;
}

interface Service {
  id: number;
  categoryId: string;
  subCategoryId: string | null;
  name: string;
  price: string;
  duration: number[];
  available: boolean;
  index: number;
}
export type {
  Master,
  Category,
  SubCategory,
  Service,
};

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
