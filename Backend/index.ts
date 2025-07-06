import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/connections/Db";
import { errorHandler } from "./src/middleware/errorMiddleware";

// load dotenv file
dotenv.config();
// connect to mongo database
connectDB();
// define express app
const app = express();
// add bodyparser for json requests
app.use(bodyParser.json());
// add errorhandler middleware
app.use(errorHandler);
// add cookie parser 
app.use(cookieParser());
// define port 
const port = process.env.PORT || 5000;
// apply cors middleware to allow access from browser
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
