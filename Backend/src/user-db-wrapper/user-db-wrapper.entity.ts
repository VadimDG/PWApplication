import { AccountEntity } from '../accounts/account.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export const USER_ENTITY_NAME = 'PWUser';

@Entity({ name: USER_ENTITY_NAME })
export class UserDbWrapperEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Column()
  password: string; 

  @OneToMany(type => AccountEntity, account => account.User, { cascade: ['insert', 'update']})
  Accounts: AccountEntity[];
}