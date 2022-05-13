import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { ITransferDto } from 'src/accounts/transfer-dto';
import { UserDbWrapperEntity } from 'src/user-db-wrapper/user-db-wrapper.entity';
import { Transactions } from './transactions';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class TransactionsService {
  constructor(private connection: Connection, private eventsGateway: EventsGateway) { }

  public async transfer(transferDto: ITransferDto): Promise<number> {
    const queryRunner = this.connection.createQueryRunner();
    let returnCode = 0;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const sender = await queryRunner.manager.createQueryBuilder(UserDbWrapperEntity, 'user')
        .leftJoinAndSelect('user.Accounts', 'Account').where('user.id = :id', { id: transferDto.senderId }).getOne();
      const receiver = await queryRunner.manager.createQueryBuilder(UserDbWrapperEntity, 'user')
        .leftJoinAndSelect('user.Accounts', 'Account').where('user.id = :id', { id: transferDto.receiverId }).getOne();

      if (!sender || !receiver) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }

      const userFromTransferableAmounts = sender.Accounts.filter(x => x.Amount > transferDto.amount);

      if (userFromTransferableAmounts.length === 0) {
        throw new HttpException('Balance exceeded', HttpStatus.BAD_REQUEST);
      }
      sender.Accounts[0].Amount -= transferDto.amount;
      receiver.Accounts[0].Amount = receiver.Accounts[0].Amount + Number(transferDto.amount);

      const updateUserEntityFrom = await queryRunner.manager.save(sender);
      const updateUserEntityTo = await queryRunner.manager.save(receiver);

      const transaction = new TransactionEntity();
      transaction.SenderId = updateUserEntityFrom.id;
      transaction.ReceiverId = updateUserEntityTo.id;
      transaction.Amount = transferDto.amount;
      transaction.Balance = sender.Accounts[0].Amount;
      transaction.Date = new Date();
      await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();

      const clientDict = this.eventsGateway.getClientsDict();
      
      if (transaction.SenderId in clientDict) {
        clientDict[transaction.SenderId].emit('balance', sender.Accounts[0].Amount);
      }

      if (transaction.ReceiverId in clientDict) {
        clientDict[transaction.ReceiverId].emit('balance', receiver.Accounts[0].Amount);
      }
      
      
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      returnCode = -1;
    }
    finally {
      await queryRunner.release();
    }

    return returnCode;
  }

  public async getUserTransactions(userId: number): Promise<Transactions> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    const transactions = await queryRunner.manager.createQueryBuilder(TransactionEntity, 'transaction')
      .where('transaction.SenderId = :id', { id: userId }).getMany();
    const resultTransactions = [];
    
    for (let i = 0; i < transactions.length; i ++) {
      const user = await getRepository(UserDbWrapperEntity).createQueryBuilder('user').where('user.id = :id', { id: transactions[i].ReceiverId }).getOne();  
      resultTransactions.push({ id: transactions[i].id, date: transactions[i].Date, username: user.username, amount: transactions[i].Amount, balance: transactions[i].Balance })
    }

    return {
      trans_token: resultTransactions
    };
  }
}
