import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedQuotes } from "../generated/graphql";


const createClient = (ctx: NextPageContext) => new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
    headers: {
        cookie: (typeof window === 'undefined'
            ? ctx?.req?.headers.cookie
            : undefined) || ''
    },
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getQuotes: {
                        keyArgs: [],
                        merge(
                            existing: PaginatedQuotes | undefined,
                            incoming: PaginatedQuotes
                        ): PaginatedQuotes {
                            return {
                                ...incoming,
                                quotes: [...(existing?.quotes || []), ...incoming.quotes],
                            }
                        }
                    }
                }
            }
        }
    })
});
