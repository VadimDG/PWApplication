import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export const ENTITY_NAME = 'PWUser';


export class UserEntity {
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
}