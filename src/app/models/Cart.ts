import {Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const CartSchema  = new Schema({
    
    productId: {
        type: ObjectId,
        required: false,
    },
    userId: {
        type: ObjectId,
        required: false,
    },
    quantity: {
        type: Number,
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

export const Cart = model('Cart', CartSchema);
