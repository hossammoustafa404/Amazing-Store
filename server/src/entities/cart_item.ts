import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import Cart from "./cart";
import Product from "./product";

@Entity()
export default class CartItem extends CustomBaseEntity {
  @Column({ default: 1 })
  qty: number;

  @ManyToOne((type) => Cart, (cart) => cart.cart_items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @ManyToOne((type) => Product, (product) => product.cart_items)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
