
import type { Request, Response, NextFunction } from "express";
 const jwt  = require("jsonwebtoken");
 const {throwError} = require("../utils/throwError");

export interface AuthRequest extends Request {
  user?: { id: number };
}

 const authMiddleware = async(req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];


  if (!token) {
    throwError("No token provided", 401);
  }
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    req.user = decoded; 
   
    next();
  } catch (err) {
    next(err);

  }
};
module.exports = authMiddleware;