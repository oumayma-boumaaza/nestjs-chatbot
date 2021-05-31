import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Admin, Employee, User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Hash } from 'crypto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, mail, sexe, matricule, birthday, cin, occupation, adress, tel, role } = createUserDto;
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
    user.occupation = occupation;
    user.adress = adress;
    user.tel = tel;
    let pswrd=user.cin+'@'+lastName;
    user.salt= await bcrypt.genSalt();
    user.password= await this.hashPassword(pswrd,user.salt);
    //console.log(pswrd);
    try{ 
        return  await user.save();       
      }
      catch(error){
    if(error.code ==='23505'){//duplicate username
       throw new ConflictException('Il existe deja un utilisateur avec cette adresse mail');
      }
  
} 
}
async validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<string>{
  const {mail,password}=authCredentialsDto;
  const user=await this.findOne({mail});
  if(user && await user.validatePassword(password)){
  return user.mail;
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