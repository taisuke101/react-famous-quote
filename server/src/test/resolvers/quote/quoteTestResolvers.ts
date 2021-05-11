export const getQuotes = `
    query getQuotes($limit: Int!, $cursor: String) {
        getQuotes(
            limit: $limit,
            cursor: $cursor
        ) {
            hasMore
            quotes {
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

export const getQuote = `
    query getQuote(
        $author: String,
        $country: String,
        $job: String,
        $category: String,
    ) {
        getQuote(
            author: $author,
            country: $country,
            job: $job,
            category: $category
        ) {
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
`;

export const getToptenQuotes = `
    query getToptenQuotes {
        getToptenQuotes {
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
`;

export const searchQuote = `
    query searchQuote($searchArgs: String!) {
        searchQuote(serchArgs: $searchArgs) {
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
`;

export const likeQuote = `
    mutation likeQuote(
        $value: Int!
        $quoteId: Int!
    ) {
        likeQuote(
            value: $value,
            quoteId: $quoteId
        )
    }
`;
