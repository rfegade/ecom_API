import { ProductController } from '../controllers/productController';
import * as express from 'express';
import { validateUser } from '../middleware/auth'
import { upload } from '../config/multer'

export const productRoute = express.Router();

productRoute.get('/', ProductController.getProducts);
productRoute.get('/:id', ProductController.getProductsById);
productRoute.post('/', upload.single('file') , ProductController.addProduct);
productRoute.post('/getProductByCategory', ProductController.getProductByCategory);
productRoute.put('/', ProductController.updateProduct);
