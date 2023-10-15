import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import SiteUser from "./site_user";
import { CustomBaseEntity } from "./custom_base_entity";

@Entity()
export default class RefreshToken extends CustomBaseEntity {
  @Column()
  token: string;

  @ManyToOne(() => SiteUser, (siteUser) => siteUser.refresh_tokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "site_user_id" })
  site_user: SiteUser;
}
