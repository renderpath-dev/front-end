import type { Order } from "./orderContract";
import type { Product } from "./productContract";
import type { User } from "./userContract";

export type ProductFormPayload = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type UserFormPayload = {
  name: string;
  email: string;
  role: User["role"];
};

export type OrderStatusPayload = {
  orderId: string;
  status: Order["status"];
};

export type ProductUpdateFormPayload = ProductFormPayload & {
  status: Product["status"];
};
