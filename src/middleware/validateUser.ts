const validateEmail = require("../utils/validEmail");
const validUserName = require("../utils/validUserInput");
const validPassword  = require("../utils/validPassword");
const { throwError } = require("../utils/throwError");
import type {Response, Request, NextFunction } from "express"

const validateRegisterUser = (req:Request, _res: Response, next:NextFunction) => {

    if (!req.body) {
      return throwError("Request body is missing",400);
    }
    const { username, password, email } = req.body;

    try {
        validUserName(username)
        validPassword(password)
        validateEmail(email)
         next()
    } catch (error) {
        next(error)
    }
};



const validateLoginUser = (req:Request, _res: Response, next:NextFunction) => {
    const { email,password } = req.body;
    try {
        validateEmail(email)
        validPassword(password)

         next()
    }catch (error) {
        next(error)
    }
};

module.exports = { validateRegisterUser, validateLoginUser };
