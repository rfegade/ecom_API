import {Request, Response, NextFunction, Errback} from 'express';
import { Cart } from '../models/Cart';

export class CartController {
    static getCart(req:Request, res:Response, next:NextFunction){
        Cart.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as : 'userCart'
                }
            }

        ],(err: Errback, result: any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'User Cart!', data : result})
            }
        })
    }

    static saveCart(req:Request, res:Response, next:NextFunction){
        const cart = new Cart(req.body);
        Cart.insertMany(cart).then(function(result){
            res.json({status: 'success', message: 'Product is added to cart!', data : {}})
        }).catch(function(err){
            res.status(500).json(
                {status: 'failed', message: err }
            )
        })
    }
}