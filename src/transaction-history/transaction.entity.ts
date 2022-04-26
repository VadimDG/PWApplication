import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const ENTITY_NAME = 'Transactions1';

@Entity({ name: ENTITY_NAME })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column()
  SenderId: number;

  @IsNotEmpty()
  @Column()
  RecieverId: number;

  @IsNotEmpty()
  @Column()
  Amount: number; 

  @Column()
  Date: Date;
}