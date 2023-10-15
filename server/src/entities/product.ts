import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import Category from "./category";
import ProductImage from "./product_image";
import CartItem from "./cart_item";

@Entity()
export default class Product extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  SKU: string;

  @Column()
  qty_in_stock: number;

  @OneToMany((type) => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @ManyToOne((type) => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany((type) => CartItem, (cartItem) => cartItem.product)
  cart_items: CartItem[];
}
