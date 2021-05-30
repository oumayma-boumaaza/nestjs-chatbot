import {IsEmail, IsString,  matches,  Matches, MaxLength, MinLength } from "class-validator";
export class AuthCredentialsDto {
 @IsString()
 @MinLength(4)
 @MaxLength(20)
 firstName: string;

 @IsString()
 @MinLength(4)
 @MaxLength(20)
 lastName: string;

 @IsString()
 @IsEmail()
 @Matches(/^[a-z0-9](\.?[a-z0-9]){5,}@oncf\.ma$/)
 mail:string;

 @IsString()
 @MinLength(8)
 @MaxLength(20)
 @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
   { message :'password should contains numbers ,letters,and these special caracter :@!?_-*#...'}
    )
 password: string;
 
}