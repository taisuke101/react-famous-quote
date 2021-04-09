import { InMemoryCache } from "@apollo/client";

import { PaginatedQuotes } from "../generated/graphql";

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getQuotes: {
                    keyArgs: false,
                    merge(
                        existing: PaginatedQuotes | undefined,
                        incoming: PaginatedQuotes
                    ): PaginatedQuotes {
                        return {
                            ...incoming,
                            quotes: [
                                ...(existing?.quotes || []), 
                                ...incoming.quotes
                            ],
                        }
                    }
                }
            }
        }
    }
})