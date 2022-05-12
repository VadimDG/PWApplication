import { TransactionsService } from './transaction.service';
import { Controller } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller()
export class TransactionController {
  constructor(private readonly authService: AuthService, private readonly transactionsService: TransactionsService) {}

  
}