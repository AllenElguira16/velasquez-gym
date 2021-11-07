import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { FitnessEntity } from './fitness-entity';

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

  @OneToOne(() => FitnessEntity, fitnessEntity => fitnessEntity.id)
  @JoinColumn({ name: 'fitness_id' })
  fitness: FitnessEntity
}
