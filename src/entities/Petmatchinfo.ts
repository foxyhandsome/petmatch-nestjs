import { type } from 'os';
import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'petmatchinfo' })
export class Petmatchinfo {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_match: number;

  @Column()
  id_userhome: number;

  @Column()
  id_pethome: number;

  @Column()
  id_userguest: number;

  @Column()
  id_petguest: number;

  @Column()
  match_userguest: boolean;

  @Column()
  match_userguest_deny: boolean;

  @Column()
  match_userhome: boolean;

  @Column()
  match_dislike: boolean;

  @Column()
  match_status: string;

  @Column({ type: 'datetime' })
  create_date: Date;

  @Column({ type: 'datetime' })
  update_date: Date;
}
