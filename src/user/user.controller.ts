import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {UserService} from './user.service'
@Controller('users')
export class UserController {
    constructor (private userService:UserService){
    }
    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserkDto:CreateUserDto):Promise<User>{
      return this.userService.createUser(createUserkDto);
    } 
    
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
      return this.userService.signIn(authCredentialsDto);
    }
    @Get(':id')
    getUser(@Param("id",ParseIntPipe)id:number){
     return this.userService.getUser(id); 
    }
}
