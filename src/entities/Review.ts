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
  id_user_home: number;  

  @Column()
  id_pet_home: number;  

  @Column()
  id_user_review: number;

  @Column()
  id_pet_review: number;

  @Column()
  admin_modify: string;



}
