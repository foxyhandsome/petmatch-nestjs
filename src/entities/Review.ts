import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'review' })
export class Review {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_review: number;

  @Column()
  review_info: string;

  @Column()
  star: number;

  @Column()
  id_pet_owner: number;  

  @Column()
  id_user: number;

  @Column()
  id_pet: number;

  @Column()
  admin_modify: string;



}
