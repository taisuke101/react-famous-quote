import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createFavoriteLoader } from "./utils/createFavoriteLoader";
import { createLikeLoader } from "./utils/createLikeLoader";

export type MyContext = {
    req: Request;
    res: Response;
    redis: Redis;
    likeLoader: ReturnType<typeof createLikeLoader>;
    favoriteLoader: ReturnType<typeof createFavoriteLoader>;
}
