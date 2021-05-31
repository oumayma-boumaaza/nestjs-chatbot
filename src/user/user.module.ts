import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Admin, Employee } from './user.entity';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret:'topSecret51',
      signOptions :{
       expiresIn:3600,
       
      },
      }),
    TypeOrmModule.forFeature([UserRepository, Admin, Employee])],
    
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
