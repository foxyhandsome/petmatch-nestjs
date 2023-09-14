import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'skintype' })
export class Skintype {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_skin: number;

  @Column({ unique: true })
  type_skin: string;

}
