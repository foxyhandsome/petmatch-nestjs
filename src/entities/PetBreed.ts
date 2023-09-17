import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({ name: 'petbreed' })
export class PetBreed {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_breed: number;

  @Column()
  name_breed: string;

}
