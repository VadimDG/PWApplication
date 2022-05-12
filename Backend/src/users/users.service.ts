import { UserDbWrapperEntity } from './../user-db-wrapper/user-db-wrapper.entity';
import { UsersDbWrapperService } from './../user-db-wrapper/users-db-wrapper.service';
import { AuthService } from 'src/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

export class UserRegisterResponseDto {
  public id_token: string = '';
}

@Injectable()
export class UsersService {
  constructor(private usersDbWrapperService: UsersDbWrapperService, private authService: AuthService) { }

  public async register(userDto: UserEntity): Promise<UserRegisterResponseDto> {
    const userWrapperDto = new UserDbWrapperEntity;
    userWrapperDto.username = userDto.username;
    userWrapperDto.email = userDto.email;
    userWrapperDto.password = userDto.password;
    const user = await this.usersDbWrapperService.createUser(userWrapperDto);
    return {
      id_token: await (await this.authService.login({ id: user.id, email: user.email } as any)).access_token
    };
  }
}
