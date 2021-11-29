import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { today } from '~/helpers/today';
import { UserEntity } from './user-entity';

@Entity({name: 'attendance'})
export class AttendanceEntity implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, userEntity => userEntity.attendances)
  user_id: string;

  @Column('boolean', { default: false })
  checkIn: boolean;

  @Column('boolean', { default: false })
  checkOut: boolean;

  @Column({ type: 'text', default: today })
  date: string;
}
