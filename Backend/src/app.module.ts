import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AppGateway } from './websocket/websocket.service';
import { TransactionsModule } from './transaction/transaction.module';
import { EventsModule } from './events/events.module';
import * as defaultOptions from './config/database';


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
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    TransactionsModule,
    AccountsModule,
    AuthModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService], //, AppGateway
})
export class AppModule { }
