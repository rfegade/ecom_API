import {Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const WishListSchema  = new Schema({
    
    productId: {
        type: ObjectId,
        required: false,
    },
    userId: {
        type: ObjectId,
        required: false,
    },
    status: {
        type: String,
        default: 'A'
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    modifiedOn: {
        type: Date
    }
}); 

export const WishList = model('WishList', WishListSchema);
