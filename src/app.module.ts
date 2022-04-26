import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionSubscriber } from './transaction-history/transaction.subscriber';
;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'admin',
      password: 'admin',
      database: 'boilerplateDb',
      entities: ["dist/**/*.entity{.ts,.js}"],
      subscribers: [ TransactionSubscriber ],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    AccountsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
