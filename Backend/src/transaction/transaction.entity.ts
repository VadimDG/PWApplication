import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const ENTITY_NAME = 'Transactions';

@Entity({ name: ENTITY_NAME })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column()
  SenderId: number;

  @IsNotEmpty()
  @Column()
  ReceiverId: number;

  @IsNotEmpty()
  @Column()
  Amount: number;

  @IsNotEmpty()
  @Column()
  Balance: number;

  @Column()
  Date: Date;
}