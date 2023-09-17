import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'district' })
export class District {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_district: number;

  @Column()
  name_district: string;

  @Column()
  province_name: string;

}
