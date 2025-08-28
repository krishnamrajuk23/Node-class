import { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        status,
        message
    });
}