import { TransactionsService } from './transaction/transaction.service';
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersDbWrapperService } from './user-db-wrapper/users-db-wrapper.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService, 
    private readonly transactionsService: TransactionsService,
    private readonly usersDbWrapperService: UsersDbWrapperService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sessions/create')
  async login(@Request() req) {
    console.log(req.user);
    const user = await this.usersDbWrapperService.findUserByEmail(req.user.email);
    return this.authService.login({email: req.user.email, id: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/protected/transactions')
  async transactionsList(@Request() req) {
    const token = req.header('authorization').split(' ')[1];
    
    const tokenPayload = (JSON.parse(atob(token.split('.')[1])))
    return this.transactionsService.getUserTransactions(tokenPayload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('api/protected/transactions')
  async transactionsCreate(@Request() req) {
    const token = req.header('authorization').split(' ')[1];
    
    const tokenPayload = (JSON.parse(atob(token.split('.')[1])))
    
    const transferDto = {
      senderId:  tokenPayload.sub,
      receiverName: req.nameTo,
      amount: req.amount
    };
    return this.transactionsService.transfer(transferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/protected/user-info')
  async userInfo(@Request() req) {
    const token = req.header('authorization').split(' ')[1];
    
    const tokenPayload = (JSON.parse(atob(token.split('.')[1])))

    const user = await this.usersDbWrapperService.findUserById(tokenPayload.sub);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      balance: user.Accounts[0].Amount
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('api/protected/users/list')
  async usersList(@Body() req) {
    return this.usersDbWrapperService.getUsersByFilter(req.filter);
  }
}
