import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function listOfUsers(req: Request, res: Response) {
    const users = await User.find(); // Database => user data
    res.status(200).json({data: users, message: "Successfully fetched all users"});
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Name, email and password are required"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashPassword});
        res.status(201).json({status:"Successful" , message: "User created successfully"});

    }catch(e){
        console.log(e);
        next(e)
    }
}

export async function createAdmin(req: Request, res: Response, next: NextFunction) {
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Name, email and password are required"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashPassword, role: 'admin'});
        res.status(201).json({status:"Successful" , message: "Admin User created successfully"});

    }catch(e){
        console.log(e);
        next(e)
    }
}

export async function createSeller(req: Request, res: Response, next: NextFunction) {
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Name, email and password are required"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashPassword, role: 'seller'});
        res.status(201).json({status:"Successful" , message: "Seller User created successfully"});

    }catch(e){
        console.log(e);
        next(e)
    }
}

export async function singeOfUser(req: Request, res: Response, next: NextFunction) {
    try{
       const {email, password} = req.body;
      if(!email || !password){
        return res.status(404).json({message: "Please enter valid details"});
      }

      const user = await User.findOne({email}); // user - database

      if(!user){
        return res.status(404).json({message: "User not found, Please enter valid details"});
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if(!validPassword){
        return res.status(403).json({message: "Unauthorized user, Please enter valid details"});
      }

      const payload = { username: user.name, email: user.email, role: user.role };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {expiresIn: '1h'});
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string, {expiresIn: '1d'});

      res.json({ data: payload, accessToken, refreshToken, message: "Successfully fetched the user"});
      
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