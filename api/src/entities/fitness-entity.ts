import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'fitness'})
export class FitnessEntity implements IFitness {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @Column('text', { nullable: true })
  img: string = null;

  @Column('text', { nullable: true })
  virtualAssistance: string = null;
}
