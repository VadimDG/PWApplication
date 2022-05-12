import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { USER_ENTITY_NAME, UserDbWrapperEntity, } from './user-db-wrapper.entity';
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
      
      const res = await queryRunner.manager.query(`SELECT count(*) as count FROM ${USER_ENTITY_NAME} where Email = '${userDto.email}'`);
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

  public async findUserById(id: number): Promise<UserDbWrapperEntity> {
    
    if (!id) {
      throw new HttpException('Argument exception. No Id provided to search for a user', HttpStatus.BAD_REQUEST);
    }
    let user: any = {};
    const queryRunner = this.connection.createQueryRunner();
    try{
      
      await queryRunner.connect();

      return await getRepository(UserDbWrapperEntity).createQueryBuilder('user')
        .leftJoinAndSelect('user.Accounts', 'Account').where('user.id = :id', { id }).getOne();
    }
    finally {
      await queryRunner.release();
    }

    return user;
  }

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

  public async getUsersByFilter(filter: string): Promise<UserDbWrapperEntity[]> {
    const queryRunner = this.connection.createQueryRunner();
    
    try{
      await queryRunner.connect();
      if (filter) {
        return await getRepository(UserDbWrapperEntity).createQueryBuilder('user').where('user.username like :filter', { filter }).getMany();
      }
      const numberOfUsersWithoutFilter = 10;
      return await getRepository(UserDbWrapperEntity).createQueryBuilder('user').limit(numberOfUsersWithoutFilter).getMany();
    }
    finally {
      await queryRunner.release();
    }
  }
}
