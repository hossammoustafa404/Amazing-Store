import { Category } from "../entities";

export interface CreateProductDto {
  name: string;
  desc: string;
  price: number;
  SKU: string;
  qty_in_stock: number;
}

export interface UpdateProductDto {
  name?: string;
  desc?: string;
  price?: number;
  SKU?: string;
  qty_in_stock?: number;
}

export interface ProductsFilterQuery extends UpdateProductDto {
  category?: { id: string };
}
