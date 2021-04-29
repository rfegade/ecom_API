import { WishListController } from '../controllers/wishlistController';
import * as express from 'express';

export const wishlistRoute = express.Router();

wishlistRoute.get('/', WishListController.getWishList);
wishlistRoute.post('/', WishListController.saveWishList);

