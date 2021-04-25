import * as express from 'express';
import {userRoute, categoryRoute, productRoute} from './routes/index';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { mongoConnect } from './db/db';

// load environment file
dotenv.config();

// load express App
var app = express();

// load bodyparsor to parse json data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//Routes
app.use('/user', userRoute);
app.use('/category',categoryRoute);
app.use('/product', productRoute);
// Port
app.listen(3000, () => {
    mongoConnect.connect().then(res => console.log('Database is connected'));
    console.log('Server running on port 3000')
});