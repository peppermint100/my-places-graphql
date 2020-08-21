import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { RegisterRequest } from './RegisterRequest';
import bcrypt from "bcryptjs"
import { User } from "./../../../entity/User"

@Resolver()
export class RegisterResolver {

    @Query(() => String)
    async hello() {
        return "hello"
    }

    @Mutation(() => User)
    async register(@Arg("data")
    {
        username,
        email,
        password,
        confirmPassword
    }: RegisterRequest) {
        if (password !== confirmPassword) throw new Error("Password Does Not Match")

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // store to db
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        }).save();

        return user
    }
}