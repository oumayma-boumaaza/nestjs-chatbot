import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Admin, Employee } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, Admin, Employee])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
