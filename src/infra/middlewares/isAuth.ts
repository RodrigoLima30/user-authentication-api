import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config.js";

interface TokenPayload extends JwtPayload {
  sub: string;
}

export function isAuth(req: Request, res: Response, next: NextFunction)  {

  try {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const [_, token] = authHeader.split(' ');
  const JWT_SECRET = String(process.env.JWT_SECRET);
  const { sub } = jwt.verify(String(token), JWT_SECRET) as TokenPayload;

  req.userId = sub

  return next();

  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }

}
