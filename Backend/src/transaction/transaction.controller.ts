import { TransactionsService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller()
export class TransactionController {
  constructor(private readonly authService: AuthService, private readonly transactionsService: TransactionsService) {}

  
}