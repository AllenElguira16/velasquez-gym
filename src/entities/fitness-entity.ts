import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { IFitness } from '~/types';

@Entity({name: 'fitness'})
export class FitnessEntity implements IFitness {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  type!: string;

  @Column('text', { nullable: true })
  img: string|null = null;

  @Column('text', { nullable: true })
  virtualAssistance?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
