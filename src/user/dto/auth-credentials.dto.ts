import {IsEmail, IsString,  matches,  Matches, MaxLength, MinLength } from "class-validator";
export class AuthCredentialsDto {
 

 @IsString()

 mail:string;

 @IsString()
 password: string;
 
}