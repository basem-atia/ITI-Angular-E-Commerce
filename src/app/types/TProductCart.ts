import { TProduct } from './TProduct';

export type TProductCart = TProduct & {
  quantity?: number;
  totalPrice?: number;
};
