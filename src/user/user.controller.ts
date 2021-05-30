import { Body, Controller, Get, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {UserService} from './user.service'


@Controller('users')
export class UserController {
    constructor (private userService:UserService){
    }
//  @UsePipes(ValidationPipe)
    @Post()
    createUser():any{
    // 
    console.log('post');
    }
    @Get()
    getUser(){
        console.log('get')
    }
}
