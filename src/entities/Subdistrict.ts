import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'subdistrict' })
export class Subdistrict {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_subdistrict: number;

  @Column({ unique: true })
  name_subdistrict: string;

  @Column({ unique: true })
  id_district: number;

}
