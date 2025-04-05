export type TProduct = {
  _id: string;
  name: string;
  discount: number;
  price: number;
  image: string;
  description: string;
  shipping: number;
  createdAt: string;
  subCategoryId: {
    _id: string;
  };
};
