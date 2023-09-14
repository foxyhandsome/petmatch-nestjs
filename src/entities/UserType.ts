import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'usertype' })
export class UserType {

  @PrimaryGeneratedColumn()
  id_type: number;

  @Column()
  type_name: string;

  @Column()
  type_description: string;

}
