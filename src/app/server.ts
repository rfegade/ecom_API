import * as express from 'express';
import {userRoute, categoryRoute, productRoute, errorLogRoute, wishlistRoute, cartRoute} from './routes/index';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { mongoConnect } from './db/db';
import * as helmet from "helmet";
import * as compression from "compression";


// const helmet: Helmet
// load environment file
dotenv.config();

// load express App
var app = express();
//var server = http.createServer(app);
app.use(helmet());
app.use(compression());

// Allow CORS 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    next();
});

// load bodyparsor to parse json data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//Routes
app.get('/', function (req, res) {
    res.send({ response: 'I am alive' }).status(200)
})
app.use('/user', userRoute);
app.use('/category',categoryRoute);
app.use('/product', productRoute);
app.use('/errorLog', errorLogRoute);
app.use('/wishlist', wishlistRoute);
app.use('/cart', cartRoute);

// Port
const host = '0.0.0.0';
//const port = process.env.PORT || 3000;
const port = parseInt(process.env.PORT || '3000', 10) || 3000;

app.listen(port, host, function() {
    console.log(`process.env.MONGODB_URL - ${process.env.MONGODB_URL}`);
    mongoConnect.connect().then(res => console.log('Database is connected'));
    console.log('Server is running')
});

// app.listen(PORT, '0.0.0.0' , () => {
//     mongoConnect.connect().then(res => console.log('Database is connected'));
//     console.log('Server is running')
// });