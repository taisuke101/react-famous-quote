import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
    if (!req.session.userId) {
        throw new Error ("認証されていません！");
    }

    return next();
}