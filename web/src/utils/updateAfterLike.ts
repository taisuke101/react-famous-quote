import { ApolloCache, gql } from "@apollo/client";

import { LikeQuoteMutation } from "../generated/graphql";

export const updateAfterLike = (
    value: number, 
    quoteId: number, 
    cache: ApolloCache<LikeQuoteMutation>,
) => {
    const data = cache.readFragment<{
        id: number;
        likeCount: number;
        likeStatus: number | null;
    }>({
        id: "Quote:" + quoteId,
        fragment: gql`
            fragment _ on Quote {
                id
                likeCount
                likeStatus
            }
        `
    })

    if (data) {
        if (data.likeStatus === value) return;
        
        const newLikeCount = (data.likeCount as number) + value;

        cache.writeFragment({
            id: "Quote:" + quoteId,
            fragment: gql`
                fragment _ on Quote {
                    likeCount
                    likeStatus
                }
            `,
            data: { likeCount: newLikeCount, likeStatus: value }
        })
    }
}