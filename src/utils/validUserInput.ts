

const {throwError } = require("../utils/throwError")

const validateUserInput = (username: string) => {

const trimmedUsername = username.trim();
if (trimmedUsername === "") {
   return throwError('Invalid username: Must not be empty', 400);
}
return trimmedUsername;
}
    


module.exports = validateUserInput;