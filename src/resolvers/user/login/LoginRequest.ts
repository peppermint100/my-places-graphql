import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailInDB } from "./LoginValidation";

@InputType()
export class LoginRequest {
    @Field()
    @IsEmail()
    @IsEmailInDB({ message: "Email Incorrect" })
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    password: string
}

