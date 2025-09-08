import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Invalid or expired token" });
        }

        res.locals.user = decoded as string | JwtPayload;; // ✅ Now safe
        next();
      }
    );
  } catch (error) {
    console.error("JWT Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
