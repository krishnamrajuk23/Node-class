import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export async function listOfUsers(req: Request, res: Response) {
    const users = await User.find(); // Database => user data
    res.status(200).json({data: users, message: "Successfully fetched all users"});
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try{
        const user = await User.create(req.body);
        res.status(201).json({user, message: "User created successfully"});
    }catch(e){
        console.log(e);
        next(e)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try{
        const id = req.params.id;
       // const {name, email, password} = req.body;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.json({ data: user , message: "User updated successfully"});
    }catch(e){
        console.log(e);
        next(e)
    }
}