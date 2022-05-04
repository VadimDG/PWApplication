import { IsNotEmpty } from 'class-validator';
import { UserDbWrapperEntity } from 'src/user-db-wrapper/user-db-wrapper.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Account' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsNotEmpty()
  Amount: number;

  @ManyToOne(() => UserDbWrapperEntity, (user) => user.Accounts)
  User: UserDbWrapperEntity
}