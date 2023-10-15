import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import Country from "./country";
import SiteUser from "./site_user";
import { CustomBaseEntity } from "./custom_base_entity";

@Entity()
export default class Address extends CustomBaseEntity {
  @Column()
  unit_number: string;

  @Column()
  street_number: string;

  @Column()
  address_line1: string;

  @Column()
  address_line2: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postal_code: string;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne((type) => Country)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @ManyToOne((type) => SiteUser, (siteUser) => siteUser.addresses)
  @JoinColumn({ name: "site_user_id" })
  site_user: SiteUser;
}
