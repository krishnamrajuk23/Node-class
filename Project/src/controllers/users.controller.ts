import { NextFunction, Request, Response } from "express";

let store: any = [{ id: 1, name: "John" }, { id: 2, name: "krish" }, { id: 3, name: "anand" }]; // Temporary in-memory store

export async function listOfUsers(req: Request, res: Response) {
    res.json(store);
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try{
        const id = String(Date.now()); // Simple unique ID based on timestamp 11222314
        const user = {id, ...req.body}  // {id:1231234123 ,name: 'hh', address: 'hyd'}
        store.push(user);
        res.status(201).json({user, message: "User created successfully"});
    }catch(e){
        console.log(e);
        next(e)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try{
        const updateStore = store.map((item: any)=> {
            if(req.params.id === item.id) {
                return { ...item, ...req.body}
            }
            return item;
        });
        res.json({ user:updateStore , message: "User updated successfully"});
    }catch(e){
        console.log(e);
        next(e)
    }
}