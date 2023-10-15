import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Address from "./address";
import { CustomBaseEntity } from "./custom_base_entity";

@Entity()
export default class Country extends CustomBaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Address, (address) => address.country)
  addresses: Address[];
}
