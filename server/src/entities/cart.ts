import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import SiteUser from "./site_user";
import CartItem from "./cart_item";

@Entity()
export default class Cart extends CustomBaseEntity {
  @OneToOne((type) => SiteUser, (siteUser) => siteUser.cart)
  @JoinColumn({ name: "site_user_id" })
  site_user: SiteUser;

  @OneToMany((type) => CartItem, (cartItem) => cartItem.cart)
  cart_items: CartItem[];
}
