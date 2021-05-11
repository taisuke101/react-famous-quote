export const getFavorits = `
    query getFavorits {
        getFavorits {
            quote {
                id
                author
                country
                job
                text
                likeCount
                likeStatus
                hasFavorite
            }
        }
    }
`;

export const getFavorite = `
    query getFavorite($quoteId: Int!) {
        getFavorite(quoteId: $quoteId) {
            quote {
                id
                author
                country
                job
                text
                likeCount
                likeStatus
                hasFavorite
            }
        }
    }
`;

export const createFavorite = `
    mutation createFavorite($quoteId: Int!) {
        createFavorite(
            quoteId: $quoteId,
        ) 
    }
`;
