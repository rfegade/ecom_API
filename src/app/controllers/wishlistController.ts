import {Request, Response, NextFunction, Errback} from 'express';
import { WishList } from '../models/WishList';

export class WishListController {
    static getWishList(req:Request, res:Response, next:NextFunction){
        WishList.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as : 'userWishList'
                }
            }

        ],(err: Errback, result: any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'User WishList!', data : result})
            }
        })
    }

    static saveWishList(req:Request, res:Response, next:NextFunction){
        const wishlist = new WishList(req.body);
        WishList.insertMany(wishlist).then(function(result){
            res.json({status: 'success', message: 'Product is added to wishlist!', data : {}})
        }).catch(function(err){
            res.status(500).json(
                {status: 'failed', message: err }
            )
        })
    }
}