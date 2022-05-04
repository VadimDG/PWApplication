import { TransactionsService } from './transaction.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('api/protected/transactions')
  async login(@Param() user) {
    return [];
  }
}