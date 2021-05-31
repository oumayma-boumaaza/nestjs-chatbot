import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {UserRepository} from'./user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository)
    private userRepository:UserRepository,
    private jwtService:JwtService,
    ){
    }
    async createUser (createUserDto:CreateUserDto):Promise<User>{
     return await this.userRepository.createUser(createUserDto);
    }
    async signIn(authCredentialsDto:AuthCredentialsDto) :Promise<{accessToken:string}>{
        const mail= await this.userRepository.validateUserPassword(authCredentialsDto);
        
        if(!mail){
        throw new UnauthorizedException('Invalid Credentials');
        }
        const payload:JwtPayload = {mail};
        const accessToken= await this.jwtService.sign(payload);
        return{accessToken};
        }
        
}

