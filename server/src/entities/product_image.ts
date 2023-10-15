import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import Product from "./product";

@Entity()
export default class ProductImage extends CustomBaseEntity {
  @Column()
  url: string;

  @ManyToOne((type) => Product, (product) => product.images)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
