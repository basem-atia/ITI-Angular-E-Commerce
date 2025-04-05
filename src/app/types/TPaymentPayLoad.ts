import { TProductCart } from './TProductCart';

export type TPaymentPayLoad = {
  data: {
    address: string;
    city: string;
    country: string;
  };
  totalPrice: number;
  orderItems: TProductCart[];
  method: string;
};
