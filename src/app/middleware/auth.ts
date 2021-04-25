import {Request, Response, NextFunction, Errback} from 'express';
import {verify } from 'jsonwebtoken';

export function validateUser(req:Request, res:Response, next:NextFunction) {
    // take the token from header
    const token:any = req.headers['x-access-token'];  
    const private_key = process.env.PRIVATEKEY || '';

    verify(token, private_key, (err:any , decoded:any) => {
        if(err) {
            res.status(401).json({
                status : 'failed',
                message : 'Your session is expired',
                data : null
            })
        } else {
            req.body.userId = decoded.id // sign function is using id as a unique parameter
            next();
        }
    })     
}