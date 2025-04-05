export type TFilter =
  | undefined
  | {
      subCategoryId: string;
      categoryId: string;
      page: number;
      freeShapping: boolean;
      hasDiscount: boolean;
      userMaxPrice: number;
      searchText: string;
      sortedBy: string;
    };
