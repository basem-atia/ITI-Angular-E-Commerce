export type TOrder = {
  _id: string;
  userId: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  payment: {
    _id: string;
    amount: number;
    createdAt: Date;
    status: string;
    paymentIntentId: string;
    currency: string;
  }[];
  shippingInfo: { address: string; city: string; country: string };
  createdAt: Date;
  orderStatus: string;
};
