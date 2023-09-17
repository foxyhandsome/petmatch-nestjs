import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'petmatchinfo' })
export class Petmatchinfo {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_match: number;

  @Column()
  id_user: number;

  @Column()
  id_pet: number;

  @Column()
  match_user: boolean;

  @Column()
  match_owner: boolean;

}
