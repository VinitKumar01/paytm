import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as jwt.Secret
      ) as jwt.JwtPayload;
      if (!decoded || !decoded.id) {
        res.status(403).json({
          message: "Invalid Token",
        });
        return;
      }

      req.body.id = decoded.id;
      next();
    } catch (_) {
      res.status(401).json({
        message: "Invalid Token",
      });
    }
  } else {
    res.status(401).json({
      message: "No token provided",
    });
  }
}
