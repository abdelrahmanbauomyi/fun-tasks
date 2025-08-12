import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users.model';

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

  @ManyToOne(() => Users, (users) => users.events,{ onDelete: 'CASCADE' })
  users: Users;
}
