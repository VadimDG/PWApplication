import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { UserRegisterResponseDto, UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserNameValidationPipe } from './user-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(public service: UsersService) { }

  @HttpCode(201)
  @UsePipes(new UserNameValidationPipe())
  @Post('/')
  async register(@Body() userDto: UserEntity): Promise<UserRegisterResponseDto> {
    return await this.service.register(userDto);
  }
}