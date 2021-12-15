import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { AttendanceEntity } from './attendance-entity';
import { FitnessEntity } from './fitness-entity';
import { MembershipEntity } from './membership-entity';

@Entity({name: 'user'})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  type: IUser['type'];

  @ManyToOne(() => FitnessEntity, fitnessEntity => fitnessEntity.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'fitness_id' })
  fitness: FitnessEntity;

  @OneToOne(() => MembershipEntity, membershipEntity => membershipEntity.user_id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'membership_id' })
  membership: MembershipEntity;

  @OneToMany(() => AttendanceEntity, attendanceEntity => attendanceEntity.user_id, {
    onDelete: 'CASCADE'
  })
  // @JoinColumn()
  attendances: AttendanceEntity[];
}
