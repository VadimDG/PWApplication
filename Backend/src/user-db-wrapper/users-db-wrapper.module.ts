import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserDbWrapperEntity } from './user-db-wrapper.entity';
import { UsersDbWrapperService } from './users-db-wrapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDbWrapperEntity]),
  ],
  providers: [UsersDbWrapperService],
  exports: [UsersDbWrapperService]
})
export class UsersDbWrapperModule {}
