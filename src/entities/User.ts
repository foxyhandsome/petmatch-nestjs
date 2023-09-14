import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './UserType';

@Entity({ name: 'user' })
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_user: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  information: string;

  @Column()
  contact: string;

  @Column()
  id_district: number;

  @Column()
  id_subdistrict: number;

  @Column()
  id_typeuser: number;
}
