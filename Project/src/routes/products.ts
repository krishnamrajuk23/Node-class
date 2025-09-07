import { Router } from "express";
import { listOfProducts, insertProductDetails, sortedProducts, avgPriceAndSumOfStockInCategory, avgRating, tagsStats, productPriceGreaterThen250 } from "../controllers/products.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import {authorize} from "../middlewares/authorize"; 

const route = Router();

route.get("/", authenticateToken, listOfProducts);
route.get("/sortWithLimit/:value", sortedProducts);
route.get("/avgPriceAndSumOfStockInCategory", avgPriceAndSumOfStockInCategory);
route.get("/avgRating", avgRating);
route.get('/tagsStats', tagsStats);
route.get('/priceTag', productPriceGreaterThen250)
route.post('/createProducts', authenticateToken, authorize, insertProductDetails)
export default route;