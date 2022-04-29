import { ITransferDto } from './../accounts/transfer-dto';
import { BadRequestException, Body, Controller, HttpCode, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserNameValidationPipe } from './user-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(public service: UsersService) { }

  @HttpCode(201)
  @UsePipes(new UserNameValidationPipe())
  @Post('/register')
  async create(@Body() userDto: UserEntity): Promise<string> {
    const resp = await this.service.register(userDto);
    
    if (resp !== 0) {
      throw new BadRequestException('Error in users controller');
    }
    return 'user created';
  }

  //@UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new UserNameValidationPipe())
  @Post('/transfer')
  async transfer(@Body() transferDto: ITransferDto): Promise<string> {
    const resp = await this.service.transfer(transferDto);
    
    if (resp !== 0) {
      throw new BadRequestException('Error in users controller');
    }
    return 'transfer made';
  }
}