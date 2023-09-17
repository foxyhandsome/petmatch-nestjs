import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'subdistrict' })
export class Subdistrict {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_subdistrict: number;

  @Column()
  name_subdistrict: string;

  @Column()
  id_district: number;

}
