import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'pet' })
export class Pet {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_pet: number;

  @Column({ unique: true })
  picture_pet: Blob;

  @Column()
  sex_pet: string;

  @Column()
  health_pet: Blob;

  @Column()
  name_pet: string;

  @Column()
  age_pet: number;

  @Column()
  id_skin: number;

  @Column()
  id_blood: number;

  @Column()
  id_user: number;

  @Column()
  id_breed: number;

}
