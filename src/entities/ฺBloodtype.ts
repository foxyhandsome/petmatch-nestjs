import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'bloodtype' })
export class Bloodtype {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_blood: number;

  @Column({ unique: true })
  type_blood: string;

}
