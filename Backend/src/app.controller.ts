import { TransactionsService } from './transaction/transaction.service';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly transactionsService: TransactionsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sessions/create')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Get('api/protected/transactions')
  async transactionsGet(@Request() req) {
    const token = req.header('authorization').split(' ')[1];
    
    const tokenPayload = (JSON.parse(atob(token.split('.')[1])))
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
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

  @UseGuards(LocalAuthGuard)
  @Get('api/protected/user-info')
  async userInfo(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Get('api/protected/users/list')
  async usersList(@Request() req) {
    return this.authService.login(req.user);
  }
}
