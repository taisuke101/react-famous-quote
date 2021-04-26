"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoriteLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Favorite_1 = require("../entities/Favorite");
const createFavoriteLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const favorits = yield Favorite_1.Favorite.findByIds(keys);
    const favoriteIdsToFavorite = {};
    favorits.forEach(favorite => {
        favoriteIdsToFavorite[`${favorite.quoteId}|${favorite.userId}`] = favorite;
    });
    return keys.map(key => favoriteIdsToFavorite[`${key.quoteId}|${key.userId}`]);
}));
exports.createFavoriteLoader = createFavoriteLoader;
//# sourceMappingURL=createFavoriteLoader.js.map