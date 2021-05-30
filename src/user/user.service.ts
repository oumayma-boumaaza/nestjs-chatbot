import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {UserRepository} from'./user.repository'
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository)
    private userRepository:UserRepository,){
    }
    async createUser (createUserDto:CreateUserDto):Promise<User>{
     return await this.userRepository.createUser(createUserDto);
    }
}

