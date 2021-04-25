import {Request, Response, NextFunction, Errback} from 'express';
import { Product } from '../models/Product';

export class ProductController {
    static getProducts(req:Request, res:Response, next:NextFunction){
        Product.find({}, (err: Errback , result:any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'Product is found', data : result})
            }
        })
    }

    static getProductsById(req:Request, res:Response, next:NextFunction){
        const productId = req.params.id;
        Product.findById(productId, (err: Errback , result:any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'Product is found', data : result})
            }
        })
    }

    static addProduct(req:Request, res:Response, next:NextFunction){
        // get the image url before add a product
        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
        const product = new Product(req.body);
        Product.insertMany(product).then(function(result){
            res.json({status: 'success', message: 'Product is added', data : result})
        }).catch(function(err){
            res.status(500).json(
                {status: 'failed', message: err }
            )
        })
    }

    static getProductByCategory(req: Request, res: Response, next: NextFunction) {
        const category = req.body.category;
        let productCount = 0;
        Product.find().estimatedDocumentCount().exec((err: Errback, result: any) => {
            productCount = result;
            Product.find({ categoryName: category }, (err: Errback, result: any) => {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err })
                } else {
                    res.json({ status: 'success', message: 'Products Found!', data: result, count: productCount })
                }
            })
        });
    }

    static updateProduct(req: Request, res: Response, next: NextFunction) {

        Product.findByIdAndUpdate(req.body._id, {
            $set: {
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                outOfStock: req.body.outOfStock
            }
        }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err })
            } else {
                res.json({ status: 'success', message: 'Product Updated!', data: result })
            }

        })
    }

    static searchProduct(req: Request, res: Response, next: NextFunction) {
        const productName = req.body.productName;
        let productCount = 0;
        Product.find().estimatedDocumentCount().exec((err: Errback, result: any) => {
            productCount = result;
            Product.find({ productName: { $regex: productName, $options: 'i' } }, (err: Errback, result: any) => {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err })
                } else {
                    res.json({ status: 'success', message: 'Product List Found!', data: result, count: productCount })
                }
            })
        });
    }
    
}