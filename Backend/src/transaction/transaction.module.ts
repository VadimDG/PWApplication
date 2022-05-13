import { AuthModule } from 'src/auth/auth.module';
import { UsersDbWrapperModule } from './../user-db-wrapper/users-db-wrapper.module';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    AuthModule,
    UsersDbWrapperModule,
    EventsModule
  ],
  controllers: [TransactionController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}