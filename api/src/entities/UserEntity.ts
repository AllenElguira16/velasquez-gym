import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @Column('boolean', { default: false })
  firstLogin: boolean = false;
}
