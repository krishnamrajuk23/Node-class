import { Router} from "express";
import { listOfUsers, create, update, singeOfUser } from "../controllers/users.controller";

const route = Router();

route.get("/", listOfUsers);
route.post("/", create);
route.put("/:id", update);
route.post("/login", singeOfUser);

//route.get("/:id", singeOfUser);

export default route;