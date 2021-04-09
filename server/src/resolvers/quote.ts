import { UserInputError } from "apollo-server-errors";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

import { PaginatedQuotes, Quote } from '../entities/Quote'
import { CreateQuoteInput, UpdateQuoteInput } from "../inputs/QuoteInput";

@Resolver()
export class QuoteResolver {
    @Query(() => PaginatedQuotes)
    async getQuotes(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null
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

    @Query(() => Quote)
    async getQuote(
        @Arg('id', () => Int!) id: number
    ): Promise<Quote | undefined> {
        return Quote.findOne(id);
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