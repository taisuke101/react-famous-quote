import { ApolloCache, gql } from "@apollo/client";
import { CreateFavoriteMutation } from "../generated/graphql";


export const updateAfterFavorite = ( 
    hasFavorite: boolean,
    quoteId: number,
    cache: ApolloCache<CreateFavoriteMutation>
) => {
    const data = cache.readFragment<{
        id: number
        hasfavorite: boolean
    }>({
        id: "Quote:" + quoteId,
        fragment: gql`
            fragment _ on Quote {
                id
                hasFavorite
            }
        `
    })

    if (data) {
        cache.writeFragment({
            id: "Quote:" + quoteId,
            fragment: gql`
                fragment _ on Quote {
                    hasFavorite
                }
            `,
            data: { hasFavorite: hasFavorite }
        })
    }
}