import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ENTITY_NAME, UserEntity } from './user.entity';
import { Connection, getRepository } from 'typeorm';
import { AccountEntity } from 'src/accounts/account.entity';
import { ITransferDto } from 'src/accounts/transfer-dto';

@Injectable()
export class UsersService {
  constructor(private connection: Connection) { }

  public async register(userDto: UserEntity): Promise<number> {
    const queryRunner = this.connection.createQueryRunner();
    try{
      
      await queryRunner.connect();
      
      const res = await queryRunner.manager.query(`SELECT count(*) as count FROM ${ENTITY_NAME} where Email = '${userDto.Email}'`);
      if (parseInt(res[0]['count']) !== 0) {
        throw new HttpException(`Email ${userDto.Email} is taken`, HttpStatus.BAD_REQUEST);
      }

      const user = Object.assign(new UserEntity(), userDto);

      const defaultAccount = new AccountEntity();
      defaultAccount.Amount = 500;
      user.Accounts = [defaultAccount];



      await queryRunner.manager.save(user);
    }
    finally {
      await queryRunner.release();
    }

    return 0;
  }

  public async transfer(transferDto: ITransferDto): Promise<number> {
    const queryRunner = this.connection.createQueryRunner();
    let returnCode = 0;
    try{
      
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const userFrom = await queryRunner.manager.createQueryBuilder(UserEntity, 'user')
        .leftJoinAndSelect('user.Accounts', 'Account').where('user.Name = :name', { name: transferDto.nameFrom}).getOne();
      const userTo = await queryRunner.manager.createQueryBuilder(UserEntity, 'user')
        .leftJoinAndSelect('user.Accounts', 'Account').where('user.Name = :name', { name: transferDto.nameTo}).getOne();
      
      if (!userFrom || !userTo) {
        throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
      }

      const userFromTransferableAmounts = userFrom.Accounts.filter(x => x.Amount > transferDto.amount);

      if (userFromTransferableAmounts.length === 0) {
        throw new HttpException(`User ${transferDto.nameFrom} doens't have enough money for transfering`, HttpStatus.BAD_REQUEST);
      }
      
      userFrom.Accounts[0].Amount -= transferDto.amount;      
      userTo.Accounts[0].Amount = userTo.Accounts[0].Amount + Number(transferDto.amount);

      await queryRunner.manager.save(userFrom);
      await queryRunner.manager.save(userTo);
      await queryRunner.commitTransaction();
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

  public async findUserByEmail(email: string): Promise<UserEntity> {
    const queryRunner = this.connection.createQueryRunner();
    try{      
      await queryRunner.connect();
      return await getRepository(UserEntity).createQueryBuilder('user').where('user.Email = :email', { email }).getOne();
    }
    finally {
      await queryRunner.release();
    }
    return null;
  }

  // public async searchByName(name): Promise<number> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   try{      
  //     await queryRunner.connect();
  //     const userFrom = await getRepository(UserEntity).createQueryBuilder('user').leftJoinAndSelect('user.Accounts', 'Account').where('user.Name = :name', { name }).getOne();
  //   }
  //   finally {
  //     await queryRunner.release();
  //   }
  //   return 0;
  // }
}
