import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { UserEntity } from './user-entity';

@Entity({name: 'attendance'})
export class AttendanceEntity implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, userEntity => userEntity.attendances, {
    eager: true
  })
  user_id: string;

  @Column('text')
  type: 'check-in'|'check-out';

  @Column('datetime', { default: (new Date()).toISOString() })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
