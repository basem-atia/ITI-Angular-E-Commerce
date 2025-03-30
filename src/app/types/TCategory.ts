import { TProduct } from './TProduct';

export type TCategory = {
  _id: string;
  name: string;
  someProducts?: TProduct[];
};
