export interface CustomError extends Error {
    statusCode?: number;
}



const throwError = (message: string, statusCode: number) => {
    const error: CustomError= new Error(message);
    error.statusCode = statusCode;
  throw error;
 
}
module.exports = { throwError };