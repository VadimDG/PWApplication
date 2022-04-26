import { Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private connection: Connection) { }

  public async getByUser(userName: string): Promise<TransactionEntity[]> {
    const queryRunner = this.connection.createQueryRunner();
    try{
      
      await queryRunner.connect();
      
      const resUser = await getRepository(UserEntity).createQueryBuilder('user').where('user.Name = :name', { name: userName }).getOne();
      const resTransactions = await getRepository(TransactionEntity).createQueryBuilder('transactions1').where('transactions.SenderId = :senderId', { SenderId: resUser.id }).getMany();
      return resTransactions;
    }
    finally {
      await queryRunner.release();
    }

    return [];
  }
}
