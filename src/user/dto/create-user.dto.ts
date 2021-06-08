import { Type } from 'class-transformer';
import{IsIn,IsEmail,Matches, IsString,IsNotEmpty, IsDate, IsNumber, IsPhoneNumber, IsBase64} from 'class-validator';
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsString()
     @IsEmail()
     @Matches(/^\w+([\.-]?\w+)*@oncf\.ma$/)
    mail:string;
    @IsNotEmpty()
    @IsString()
    @IsIn(['femme','homme'])
    sexe:string;
    @IsNotEmpty()
    @IsString()
    matricule:string;
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly birthday:Date;
    @IsNotEmpty()
    @IsString()
    cin:string;
    @IsNotEmpty()
    @IsString()
    occupation:string;
    @IsNotEmpty()
    @IsString()
    adress:string;
    @IsNotEmpty()
    @IsPhoneNumber('MA')
    tel:string;
    @IsIn(['Admin','Employee'])
    @IsString()
    role:string;
    @IsString()
    avatar:string;

}