import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Admin, Employee, User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Hash } from 'crypto';
import { JwtPayload } from './jwt-payload.interface';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, mail, sexe, matricule, birthday, cin, occupation, adress, tel, role,avatar } = createUserDto;
    let user;
    if (role === "Admin") {
      user = new Admin();
    } else if (role=== "Employee"){
      user = new Employee();
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.mail = mail;
    user.sexe = sexe;
    user.matricule = matricule;
    user.birthday = birthday;
    user.cin = cin;
    user.avatar=Buffer.from(avatar).toString('base64');
    user.occupation = occupation;
    user.adress = adress;
    user.tel = tel;
    let pswrd="A@123456";
    user.salt= await bcrypt.genSalt();
    user.password= await this.hashPassword(pswrd,user.salt);
    //console.log(pswrd);
    try{ 
        return  await user.save();       
      }
      catch(error){
    if(error.errno ===1062){//duplicate username
      
       throw new ConflictException('Il existe deja un utilisateur avec cette adresse mail');
      }
      throw new InternalServerErrorException('Error');
} 
}
async validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<JwtPayload>{
  
  const {mail,password}=authCredentialsDto;
  const user=await this.findOne({mail});
  if(user && await user.validatePassword(password)){
    let role:string =typeof user;
  return {
    mail:user.mail,
    id:user.UserId,
    lastName:user.lastName,
    firstName:user.firstName,
    role};
  }
  else 
  {
     return null;
 }
}
private async hashPassword(password:string,salt:string):Promise<string>{
  return bcrypt.hash(password, salt);
}
 }