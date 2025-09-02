import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";

export async function listOfProducts (req: Request, res: Response, next: NextFunction) {
    try{
        const products = await Product.find();
        res.status(200).json({data: products, message: "Successfully fetched all products"});
    }catch(e){
        console.log(e);
        next(e)
    }
};

export async function sortedProducts (req: Request, res: Response, next: NextFunction) {
    console.log("Value",req.params);
    const value = +req.params.value;
    try{
        // const products = await Product.find().sort({price: 1}).limit(value);
        const products = await Product.aggregate([
            {$sort: {price: -1}},
            {$limit: value}
        ])
        res.status(200).json({data: products, message: "Successfully fetched all products"});
    }catch(e){
        console.log(e);
        next(e)
    }
};


export async function createProducts (req: Request, res: Response, next: NextFunction) {
    try{
        const products = await Product.create(req.body);
        res.status(200).json({data: products, message: "Successfully fetched all products"});
    }catch(e){
        console.log(e);
        next(e)
    }
};

export async function avgPriceAndSumOfStockInCategory (req: Request, res: Response, next: NextFunction) {
    try{
        // const products = await Product.find().sort({price: 1}).limit(value);
        const result = await Product.aggregate([
            {$group: {_id:  "$category", avgPrice: {$avg: "$price"}, totalStock: {$sum: "$stock"}}},
            
        ])
        res.status(200).json({data: result, message: "Successfully fetched all result with group by category"});
    }catch(e){
        console.log(e);
        next(e)
    }
};

export async function avgRating (req: Request, res: Response, next: NextFunction) {
    try{
        // const products = await Product.find().sort({price: 1}).limit(value);
        const result = await Product.aggregate([
            {$project: {name: 1, category: 1, price:1, avgRating: {$avg: "$ratings"}}},
        ])
        res.status(200).json({data: result, message: "Successfully fetched all result with group by category"});
    }catch(e){
        console.log(e);
        next(e)
    }
};

export async function tagsStats(req: Request, res: Response, next: NextFunction){
    try{
    const tagStatus = await Product.aggregate([
        {$unwind: "$tags"},
        {$group: {_id: "$tags", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ])

    res.status(200).json({data: tagStatus, message: "Successfully fetched all result with group by category"});
    }   catch(e){
        console.log(e);
        next(e)
    }
}

export async function productPriceGreaterThen250(req: Request, res: Response, next: NextFunction){
    try{
    const products = await Product.aggregate([
        {$match: {price: {$gt: 250}}},
        {$project: {category: 1, name: 1, tags: 1}}
    ])

    res.status(200).json({data: products, message: "Successfully fetched all result with group by category"});
    }   catch(e){
        console.log(e);
        next(e)
    }
}