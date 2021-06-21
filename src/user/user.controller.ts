import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
import { Admin, Employee, User } from './user.entity';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard())
  createUser(
    @Body() createUserkDto: CreateUserDto,
    @GetUser() user: Admin | Employee,
  ): Promise<User> {
    console.log(user);
    return this.userService.createUser(createUserkDto, user);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard())
  @Patch('/avatar/:id')
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Body('avatar') avatar: string,
    @GetUser() user: Admin | Employee,
  ) {
    return this.userService.updateAvatar(id, avatar, user);
  }
}
