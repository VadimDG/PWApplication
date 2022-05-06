import { ITransferDto } from './../accounts/transfer-dto';
import { BadRequestException, Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UserRegisterResponseDto, UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserNameValidationPipe } from './user-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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