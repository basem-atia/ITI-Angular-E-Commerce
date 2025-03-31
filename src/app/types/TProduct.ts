export type TProduct = {
  _id: string;
  name: string;
  discount: number;
  price: number;
  image: string;
  description: string;
  deliveryIsFree: boolean;
  isUsed: boolean;
  createdAt: string;
  subCategoryId: {
    _id: string;
  };
};
