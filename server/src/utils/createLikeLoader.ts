import DataLoader from 'dataloader';
import { Like } from '../entities/Like';

export const createLikeLoader = () => 
    new DataLoader<{ quoteId: number, userId: number }, Like | null>(
        async (keys) => {
            const likes = await Like.findByIds(keys as any);
            const likeIdsToLike: Record<string, Like> = {};
            likes.forEach(like => {
                likeIdsToLike[`${like.quoteId}|${like.userId}`] = like
            });

            return keys.map(key =>
                likeIdsToLike[`${key.quoteId}|${key.userId}`]
            );
        }
    );