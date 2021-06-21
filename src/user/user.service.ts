import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Admin, Employee, User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class UserService {
  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new NotFoundException(
        ' il n existe aucun utilisateur avec l id: ' + id,
      );
    return user;
  }
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(
    createUserDto: CreateUserDto,
    user: Admin | Employee,
  ): Promise<User> {
    if (user instanceof Admin)
      return await this.userRepository.createUser(createUserDto);
    throw new ForbiddenException('Vous avez pas les droit de cette opération');
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const payload: JwtPayload = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!payload) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    // const payload:JwtPayload = {mail};
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async changePassword(oldPassword: string, newPassword: string, user: User) {
    const result = user.validatePassword(newPassword);
    if (!result) {
      throw new UnauthorizedException('mot de pss incorrecte');
    } else {
    }
  }

  async updateAvatar(id: number, avatar: string, user: Admin | Employee) {
    if (user instanceof Admin || user.UserId === id)
      return await this.userRepository.updateAvatar(id, avatar);
    throw new ForbiddenException('Vous pouvez pas effectuer cette operation!');
  }
}
