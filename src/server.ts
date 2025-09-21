const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");



//file imports
const authRoutes = require("./routes/authRoutes");
const boardsRoutes = require("./routes/boardsRoute");
const listsRoute = require("./routes/listsRoute");
const cardsRoute = require("./routes/cardsRoute");
const notfoundHandler = require("./middleware/notfound")
const globalErrorHandler = require("./middleware/globalError");
import type {Request, Response} from "express"

const app = express();
const PORT = 5000;


//Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Homepage")
})


//Routes
//Authentication Routes
app.set("json spaces", 2);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/boards", boardsRoutes);
app.use("/api/v1", listsRoute);
app.use("/api/v1", cardsRoute);

// Handle unmatched routes (404)
app.all("*", notfoundHandler);
app.use(globalErrorHandler);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
