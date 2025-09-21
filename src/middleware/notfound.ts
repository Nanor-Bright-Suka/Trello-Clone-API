const {throwError} = require("../utils/throwError");
import type { Request, Response, NextFunction } from "express";

const notfoundHandler = (req: Request, _res: Response, _next: NextFunction) => {
    throwError(`Can't find ${req.originalUrl} on the server!`, 404)
}

module.exports = notfoundHandler;