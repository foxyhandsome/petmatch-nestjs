import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'skintype' })
export class Skintype {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_skin: number;

  @Column()
  type_skin: string;

}
