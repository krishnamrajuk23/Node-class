import { Router } from "express";
import users from "./users";
import products from "./products";
import jwt from "jsonwebtoken";

const router = Router();
router.use("/users", users);
router.use("/admin", users);
router.use("/seller", users);
router.use("/products", products);
router.use("/refresh", (req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
        if(!err) return res.sendStatus(403);

        const payload = { username: user.name, email: user.email, role: user.role };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {expiresIn: '15m'});
        res.json({accessToken});
    })
})
export default router;