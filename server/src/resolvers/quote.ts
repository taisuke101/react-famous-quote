import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";

import { PaginatedQuotes, Quote } from '../entities/Quote'
import { Like } from "../entities/Like";
import { Favorite } from "../entities/Favorite";
import { CreateQuoteInput, UpdateQuoteInput } from "../inputs/QuoteInput";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver(Quote)
export class QuoteResolver {
    @FieldResolver(() => Int, { nullable: true})
    async likeStatus(
        @Root() quote: Quote,
        @Ctx() { req }: MyContext
    ): Promise<number | null> {
        if (!req.session.userId) return null;

        const like = await Like.findOne({
            quoteId: quote.id,
            userId: req.session.userId as number
        });

        return like?.value === 1 ? 1 : null;
    }

    @FieldResolver(() => Boolean, {nullable: true})
    async hasFavorite(
        @Root() quote: Quote,
        @Ctx() { req }: MyContext
    ): Promise<boolean | null> {
        if (!req.session.userId) return null;

        const favorite = await Favorite.findOne({
            quoteId: quote.id,
            userId: req.session.userId  as number
        });

        return favorite ? true : false;
    }

    @Query(() => PaginatedQuotes)
    async getQuotes(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
    ): Promise<PaginatedQuotes> {
        const quoteLimit = Math.min(50, limit);
        const quoteLimitPlusOne = quoteLimit + 1;
        
        const qb =getConnection()
            .getRepository(Quote)
            .createQueryBuilder("q")
            .orderBy('"createdAt"', "ASC")
            .take(quoteLimitPlusOne)
        if (cursor) {
            qb.where('"id" > :cursor', { cursor })
        }

        const quotes = await qb.getMany();

        return {
            quotes: quotes.slice(0, quoteLimit),
            hasMore: quotes.length === quoteLimitPlusOne
        };
    }

    @Query(() => [Quote])
    async getQuote(
        @Arg('author', () => String, { nullable: true }) author: string,
        @Arg('country', () => String, { nullable: true }) country: string,
        @Arg('job', () => String, { nullable: true }) job: string
    ): Promise<Quote[] | undefined> {
        if (author)
            return Quote.find({author});
        else if (country)
            return Quote.find({country});
        else
            return Quote.find({job});
    }

    @Query(() => [Quote])
    async getToptenQuotes(): Promise<Quote[]> {
        const quote = Quote.find({
            order: { likeCount: "DESC"}
        })

        return (await quote).slice(0, 10)
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likeQuote(
        @Arg('quoteId', () => Int) quoteId: number,
        @Arg('value', () => Int) value: number,
        @Ctx() { req }: MyContext
    ) {
        const isLike = value !== -1;
        const realValue = isLike ? 1 : -1;
        const { userId } = req.session;

        const like = await Like.findOne({
            userId: userId as number, 
            quoteId
        });

        if (like && like.value !== realValue) {
            await getConnection().transaction(async (transaction) => {
                await transaction.query(`
                    update likes
                    set value = $1
                    where "quoteId" = $2 and "userId" = $3
                `, [realValue, quoteId, userId]);

                await transaction.query(`
                    update quotes
                    set "likeCount" = "likeCount" + $1
                    where id = $2
                `, [realValue, quoteId]);
            })
        } else if (!like) {
            await getConnection().transaction(async (transaction) => {
                await transaction.query(`
                    insert into likes ("userId", "quoteId", value)
                    values ($1, $2, $3)
                `, [userId, quoteId, realValue]);

                await transaction.query(`
                    update quotes
                    set "likeCount" = "likeCount" + $1
                    where id = $2
                `, [realValue, quoteId])
            });
            
        }//
        return true;
    }

    @Mutation(() => Quote)
    async createQuote(
        @Arg('data') data: CreateQuoteInput
    ): Promise<Quote> {
        return Quote.create({...data}).save();
    }

    @Mutation(() => Quote)
    async updateQuote(
        @Arg('id', () => Int!) id: number,
        @Arg('data') data: UpdateQuoteInput
    ): Promise<Quote | undefined> {
        const quote = await Quote.findOne(id);
        
        if (!quote) throw new UserInputError('名言が見つかりません！');
        
        if (typeof quote !== undefined) {
            const updatedQuote = Object.assign(quote, data)

            await updatedQuote.save();
        };
        
        return quote;
    }

    @Mutation(() => Boolean)
    async deleteQuote(@Arg('id', () => Int!) id: number): Promise<boolean> {
        await Quote.delete(id);
        return true;
    }
}