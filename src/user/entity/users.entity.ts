import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Events } from 'src/events/entity/events.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @OneToMany(() => Events, (events) => events.user)
  events: Events[];
}
