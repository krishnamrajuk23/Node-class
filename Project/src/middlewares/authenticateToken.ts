import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticateToken(req: Request, res : Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
   
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if(err) return res.status(403).json("unauthorized token not valid");

        // console.log("user====", user);
        req.body.user = user;
        return next();
    })  
}