import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Account' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsNotEmpty()
  Amount: number;

  @ManyToOne(() => UserEntity, (user) => user.Accounts)
  User: UserEntity
}