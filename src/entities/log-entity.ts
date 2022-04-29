import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { ILog } from '~/types';

@Entity({name: 'log'})
export class LogEntity implements ILog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
