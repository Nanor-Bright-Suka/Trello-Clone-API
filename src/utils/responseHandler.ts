
import type { Response } from "express";

const handleResponse = <T>(res: Response, status: number, message: string, data?: T) => {
   return res.status(status).json({ status, message, ...(data !== undefined && { data }) });
  };

module.exports = handleResponse;