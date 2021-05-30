import { EntityRepository, Repository } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Admin, Employee, User } from './user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
   async createUser (createUserDto:CreateUserDto):Promise<User>{
    const{firstName,lastName,mail,sexe,matricule,birthday,cin,occupation,adress,tel,role}=createUserDto;
    const admin = new Admin;
    const employee= new Employee;
    if(role==="Admin"){
    admin.firstName=firstName;
    admin.lastName=lastName;
    admin.mail=mail;
    admin.sexe=sexe;
    admin.matricule=matricule;
    admin.birthday=birthday;
    admin.cin=cin;
    admin.occupation=occupation;
    admin.adress=adress;
    admin.tel=tel;
    return await admin.save();
    }else{
      employee.firstName=firstName;
      employee.lastName=lastName;
      employee.mail=mail;
      employee.sexe=sexe;
      employee.matricule=matricule;
      employee.birthday=birthday;
      employee.cin=cin;
      employee.occupation=occupation;
      employee.adress=adress;
      employee.tel=tel;     
      return await employee.save();
    }
    
   }
}
