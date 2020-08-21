import { IsEmailAlreadyExist, IsUserNameAlreadyExist } from './RegisterValidation';
import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterRequest {
    @Field()
    @IsNotEmpty()
    @IsUserNameAlreadyExist({ message: "Username Already Exist" })
    username: string

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @IsEmailAlreadyExist({ message: "Email Already Exist" })
    email: string

    @Field()
    @IsNotEmpty()
    password: string

    @Field()
    @IsNotEmpty()
    confirmPassword: string
}
