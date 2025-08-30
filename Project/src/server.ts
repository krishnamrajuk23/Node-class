import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const PROT = process.env.PROT || 4000;

app.listen(PROT, () => console.log(`Server is started ${PROT}`))