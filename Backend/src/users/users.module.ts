import { AuthModule } from 'src/auth/auth.module';
import { UsersDbWrapperModule } from './../user-db-wrapper/users-db-wrapper.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    UsersDbWrapperModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
