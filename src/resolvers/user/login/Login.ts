import { ApolloError } from './../../../exception/ApolloError';
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { LoginRequest } from './LoginRequest';
import bcrypt from "bcryptjs"
import { User } from "./../../../entity/User"
import { ExpressContext } from 'src/type/ExpressContext';

@Resolver()
export class LoginResolver {
    @Mutation(() => User)
    async login(@Arg("data")
    {
        email,
        password
    }: LoginRequest
        , @Ctx() ctx: ExpressContext
    ) {
        const user = await User.findOne({ email })
        const valid = await bcrypt.compare(password, user!.password)
        if (!valid) throw new ApolloError("Password Incorrect")

        ctx.req.session!.userId = user!.userId

        return user
    }
}