import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Events } from 'src/events/entity/events.entity';
/**
 * Represents an event in the system.
 *
 * @property {string - uuid} user_id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {Events[]} events - has the relation of one to many (one user to many events) translates to user_ID foring key in the events table in the db

 */
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @OneToMany(() => Events, (events) => events.user)
  events: Events[];
}
