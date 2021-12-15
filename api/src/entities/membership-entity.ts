import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { membershipExpiryDate, today } from '~/helpers/today';
import { FitnessEntity } from './fitness-entity';
import { UserEntity } from './user-entity';

@Entity({name: 'membership'})
export class MembershipEntity implements IMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => UserEntity, userEntity => userEntity.attendances)
  // @OneToOne(() => UserEntity, userEntity => userEntity.membership, {
  //   onDelete: 'CASCADE'
  // })
  // @JoinColumn({ name: 'membership_id' })
  @Column('uuid')
  user_id: string;

  @Column('boolean')
  paid: boolean;

  @Column('date', { default: today })
  startDate: string;

  @Column('date', { default: membershipExpiryDate })
  endDate: string;
}
