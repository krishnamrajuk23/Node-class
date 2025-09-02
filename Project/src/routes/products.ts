import { Router } from "express";
import { listOfProducts, sortedProducts, avgPriceAndSumOfStockInCategory, avgRating, tagsStats, productPriceGreaterThen250 } from "../controllers/products.controller";

const route = Router();

route.get("/", listOfProducts);
route.get("/sortWithLimit/:value", sortedProducts);
route.get("/avgPriceAndSumOfStockInCategory", avgPriceAndSumOfStockInCategory);
route.get("/avgRating", avgRating);
route.get('/tagsStats', tagsStats);
route.get('/priceTag', productPriceGreaterThen250)
export default route;