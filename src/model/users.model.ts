import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Events } from './events.model';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @OneToMany(() => Events, (events) => events.users)
  events: Events[];
}
