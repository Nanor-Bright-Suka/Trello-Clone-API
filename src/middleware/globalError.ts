
const globalErrorHandler = (error: any, _req: any, res: any, _next: any) => {
  error.statusCode = error.statusCode || 500;

  if (error.code === "23505") { 
    error.statusCode = 409;
    error.message = "Duplicate entry, please use a different value.";
} else if (error.code === "ECONNREFUSED") { 
    error.message = "Database connection failed.";
}

  res.status(error.statusCode).json({
    statusCode: error.statusCode, 
    message: error.message,
   
  })
  };

module.exports = globalErrorHandler;
