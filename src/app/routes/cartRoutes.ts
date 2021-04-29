import { CartController } from '../controllers/cartController';
import * as express from 'express';

export const cartRoute = express.Router();

cartRoute.get('/', CartController.getCart);
cartRoute.post('/', CartController.saveCart);

