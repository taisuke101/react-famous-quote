import DataLoader from 'dataloader';
import { Favorite } from '../entities/Favorite';

export const createFavoriteLoader = () => 
    new DataLoader<{ quoteId: number, userId: number}, Favorite | null>(
        async (keys) => {
            const favorits = await Favorite.findByIds(keys as any);
            const favoriteIdsToFavorite: Record<string, Favorite> = {};
            favorits.forEach(favorite => {
                favoriteIdsToFavorite[`${favorite.quoteId}|${favorite.userId}`] = favorite;
            });

            return keys.map(key => 
                favoriteIdsToFavorite[`${key.quoteId}|${key.userId}`]
            );
        }
    );