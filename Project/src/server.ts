import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PROT = process.env.PROT;

app.listen(PROT, () => console.log(`Server is started ${PROT}`))