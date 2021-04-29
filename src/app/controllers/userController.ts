import {Request, Response, NextFunction, Errback} from 'express';
import { User } from '../models/User';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class userController {
    static login(req:Request, res:Response, next:NextFunction){
        const private_key = process.env.PRIVATEKEY || '';
        
        // find recond from database
        User.findOne( {email : req.body.email}, (err: Errback , result:any) => {
            if(err) {
                res.status(500).json({status : 'failed', message: err })
            } else {
                // check if result has null values
                if(result != undefined){
                    // create a auth token 
                        const token = sign({id: result._id}, private_key, { expiresIn : '1h'});

                    // compare password with the function provided by bcrypt
                    if(compareSync(req.body.password, result.password)) {
                        res.json({status : 'Success', message: 'Login is successful', data: token, role: result.role })
                    } else {
                        res.status(500).json({status : 'failed', message: 'UserName or Password is incorrect!' })
                    }

                } else {
                    res.status(500).json({status : 'failed', message: 'UserName or Password is incorrect!' })
                }
            }
        })
    }

    static registration(req:Request, res:Response, next:NextFunction){
        const user = new User(req.body);
        User.create(user, (err: any , result:any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'Registration Successful!', data : result})
            }
        })
    }

    static updateProfile(req:Request, res:Response, next:NextFunction){
        const userId = req.body.userId;
        User.findByIdAndUpdate(userId, {
            $set : {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                addressInfo  :req.body.addressInfo
            }
        } ,(err: Errback , result:any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'Profile is updated!', data : null})
            }
        })
    }

    static getProfile(req:Request, res:Response, next:NextFunction) {
        const userId = req.body.userId;
        User.findById(userId, (err: Errback , result:any) => {
            if(err) {
                res.status(500).json(
                    {status: 'failed', message: err }
                )
            } else {
                res.json({status: 'success', message: 'Profile is retrived!', data : result})
            }
        })
    }
}