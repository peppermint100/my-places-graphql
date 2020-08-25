import { Resolver, Mutation, Ctx } from "type-graphql";
import { ExpressContext } from 'src/type/ExpressContext';

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: ExpressContext
    ) {
        if (!ctx.req.session!.userId) return true
        ctx.req.session!.destroy((err) => {
            if (err) {
                console.log('logout err: ', err)
                return false
            }
            return true
        }
        )
        ctx.res.clearCookie("qid")
        return true
    }
}