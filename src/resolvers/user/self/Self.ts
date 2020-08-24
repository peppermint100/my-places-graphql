import { User } from './../../../entity/User';
import { Resolver, Query, Ctx } from "type-graphql";
import { ExpressContext } from 'src/type/ExpressContext';

@Resolver()
export class SelfResolver {
    @Query(() => User, { nullable: true })
    async self(@Ctx() ctx: ExpressContext) {
        if (!ctx.req.session!.userId) {
            return null
        }

        const user = User.findOne({
            where: {
                userId: ctx.req.session!.userId
            }
        })

        return user
    }
}