import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { UserEntity } from './user-entity';

@Entity({name: 'membership'})
export class MembershipEntity implements IMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, userEntity => userEntity.memberships, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: IUser;

  @Column('boolean')
  paid: boolean;
  
  @Column('datetime', { default: (new Date()).toISOString() })
  startDate: Date;

  @Column('datetime', { default: (new Date(new Date().setDate((new Date()).getDate() + 30))).toISOString() })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
