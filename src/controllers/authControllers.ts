
import type {Request, Response, NextFunction} from "express"
const { registerUserService, loginUserService } = require('../services/userServices');
const handleResponse = require("../utils/responseHandler");

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    const user = await registerUserService(username, password, email)
    handleResponse(res, 201, user.message, user)
  } catch (error) {
    next(error)
  }
 
};


const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginResult = await loginUserService(email, password)
    handleResponse(res, 200, loginResult.message, loginResult)
  } catch(error){
    next(error)
  }
};

module.exports = {register, login}