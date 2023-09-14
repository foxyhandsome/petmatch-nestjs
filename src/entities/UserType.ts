import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'usertype' })
export class UserType {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_typeuser: number;

  @Column()
  type_name: string;
}
