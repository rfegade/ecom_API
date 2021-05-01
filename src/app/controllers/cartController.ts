import {Request, Response, NextFunction, Errback} from 'express';
import { Types } from 'mongoose';
import { Cart } from '../models/Cart';

export class CartController {
    static getUserCart(req:Request, res:Response, next:NextFunction){
        Cart.aggregate([
            {
                $match : { userId: new Types.ObjectId(req.body.userId) , status: 'A'}
            },
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

    static saveToCart(req:Request, res:Response, next:NextFunction){
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