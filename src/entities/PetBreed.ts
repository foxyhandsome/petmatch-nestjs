import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'petbreed' })
export class PetBreed {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_breed: number;

  @Column({ unique: true })
  name_breed: string;

}
