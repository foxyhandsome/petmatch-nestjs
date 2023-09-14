import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'review' })
export class Review {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_review: number;

  @Column({ unique: true })
  review_info: string;

  @Column({ unique: true })
  star: number;

  @Column({ unique: true })
  id_user: number;

  @Column({ unique: true })
  id_pet: number;

  @Column({ unique: true })
  admin_modify: string;



}
