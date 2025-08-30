import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/error";
import routes from "./routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(errorHandler);

app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
    res.send("express started");
})

export default app;