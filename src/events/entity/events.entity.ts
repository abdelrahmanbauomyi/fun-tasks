import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from 'src/user/entity/users.entity';
/**
 * Represents an event in the system.
 *
 * @property {number} event_id - The unique identifier for the event.
 * @property {string} event_name - The name of the event.
 * @property {Users} user - has the relation of many to one (Many events to one user) translates to user_ID foring key in the events table in the db
 * @property {Date} execute_at - The scheduled date and time of the event.
 * @property {Date} execute_at - The date of excution if the event was excuted
 * @property {String} -  The status of event which would be either Pending or Excuted
 */
@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  event_id: string;

  @Column()
  event_name: string;

  @Column({ type: 'timestamptz' })
  execute_at: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamptz', nullable: true })
  executed_at: Date | null;

  @ManyToOne(() => Users, (users) => users.events, { onDelete: 'CASCADE' })
  user: Users;
}
