import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ENTITY_NAME, UserDbWrapperEntity, } from './user-db-wrapper.entity';
import { Connection, getRepository } from 'typeorm';
import { AccountEntity } from 'src/accounts/account.entity';

export class UserRegisterResponseDto {
  public id_token: string = '';
}

@Injectable()
export class UsersDbWrapperService {
  constructor(private connection: Connection) { }

  public async createUser(userDto: UserDbWrapperEntity): Promise<UserDbWrapperEntity> {
    
    if (!userDto.username || !userDto.email || !userDto.password) {
      throw new HttpException('You must send username and password', HttpStatus.BAD_REQUEST);
    }
    let user: any = {};
    const queryRunner = this.connection.createQueryRunner();
    try{
      
      await queryRunner.connect();
      
      const res = await queryRunner.manager.query(`SELECT count(*) as count FROM ${ENTITY_NAME} where Email = '${userDto.email}'`);
      if (parseInt(res[0]['count']) !== 0) {
        throw new HttpException('A user with that email already exists', HttpStatus.BAD_REQUEST);
      }

      const userEntity = Object.assign(new UserDbWrapperEntity(), userDto);

      const defaultAccount = new AccountEntity();
      defaultAccount.Amount = 500;
      userEntity.Accounts = [defaultAccount];

      user = await queryRunner.manager.save(userEntity);
    }
    finally {
      await queryRunner.release();
    }

    return user;
  }

  // public async transfer(transferDto: ITransferDto): Promise<number> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   let returnCode = 0;
  //   try{
      
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     const userFrom = await queryRunner.manager.createQueryBuilder(UserEntity, 'user')
  //       .leftJoinAndSelect('user.Accounts', 'Account').where('user.Name = :name', { name: transferDto.nameFrom}).getOne();
  //     const userTo = await queryRunner.manager.createQueryBuilder(UserEntity, 'user')
  //       .leftJoinAndSelect('user.Accounts', 'Account').where('user.Name = :name', { name: transferDto.nameTo}).getOne();
      
  //     if (!userFrom || !userTo) {
  //       throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
  //     }

  //     const userFromTransferableAmounts = userFrom.Accounts.filter(x => x.Amount > transferDto.amount);

  //     if (userFromTransferableAmounts.length === 0) {
  //       throw new HttpException(`User ${transferDto.nameFrom} doens't have enough money for transfering`, HttpStatus.BAD_REQUEST);
  //     }
      
  //     userFrom.Accounts[0].Amount -= transferDto.amount;      
  //     userTo.Accounts[0].Amount = userTo.Accounts[0].Amount + Number(transferDto.amount);

  //     const updateUserEntityFrom = await queryRunner.manager.save(userFrom);
  //     const updateUserEntityTo = await queryRunner.manager.save(userTo);

  //     const transaction = new TransactionEntity();
  //     transaction.SenderId = updateUserEntityFrom.id;
  //     transaction.RecieverId = updateUserEntityTo.id;
  //     transaction.Amount = transferDto.amount;
  //     transaction.Date = new Date();
  //     await queryRunner.manager.save(transaction);
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     console.error(err);
  //     await queryRunner.rollbackTransaction();
  //     returnCode = -1;
  //   } 
  //   finally {
  //     await queryRunner.release();
  //   }

  //   return returnCode;
  // }

  public async findUserByEmail(email: string): Promise<UserDbWrapperEntity> {
    const queryRunner = this.connection.createQueryRunner();
    try{      
      await queryRunner.connect();
      return await getRepository(UserDbWrapperEntity).createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    }
    finally {
      await queryRunner.release();
    }
  }
}