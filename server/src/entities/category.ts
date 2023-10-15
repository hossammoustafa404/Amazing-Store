import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import Product from "./product";

@Entity()
export default class Category extends CustomBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;

  @Column()
  image: string;

  @ManyToOne((type) => Category, (category) => category.sub_categories, {
    onDelete: "CASCADE",
  })
  parent_category: Category;

  @OneToMany((type) => Category, (category) => category.parent_category)
  sub_categories: Category[];

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}
