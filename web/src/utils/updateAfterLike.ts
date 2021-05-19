import { ApolloCache, gql } from '@apollo/client';

import { LikeQuoteMutation } from '../generated/graphql';

export const updateAfterLike = (
	value: number,
	quoteId: number,
	cache: ApolloCache<LikeQuoteMutation>
) => {
	const data = cache.readFragment<{
		id: number;
		likeCount: number;
		likeStatus: number | null;
	}>({
		id: 'Quote:' + quoteId,
		fragment: gql`
			fragment _like on Quote {
				id
				likeCount
				likeStatus
			}
		`,
	});

	if (data) {
		if (data.likeStatus === value) return;

		const newLikeCount = data.likeCount + value;

		cache.writeFragment({
			id: 'Quote:' + quoteId,
			fragment: gql`
				fragment __like on Quote {
					likeCount
					likeStatus
				}
			`,
			data: { likeCount: newLikeCount, likeStatus: value },
		});
	}
};
