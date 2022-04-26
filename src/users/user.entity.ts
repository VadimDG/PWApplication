import { AccountEntity } from './../accounts/account.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export const ENTITY_NAME = 'PWUser';

@Entity({ name: ENTITY_NAME })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column()
  Name: string;

  @Column()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @Column()
  Password: string; 

  @OneToMany(type => AccountEntity, account => account.User, { cascade: ['insert', 'update']})
  Accounts: AccountEntity[];
}