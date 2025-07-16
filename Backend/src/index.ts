import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./connections/Db";
import { errorHandler } from "./middleware/errorMiddleware";
import customerRouter from "./routes/customerRouter";
import employeeRouter from "./routes/employeeRouter";
import carRouter from "./routes/carRouter";
import attendanceRouter from "./routes/attendanceRouter";
import carPartsRouter from "./routes/carPartsRouter";

// load dotenv file
dotenv.config();

// connect to mongo database
connectToDB();

// define express app
const app = express();

// add bodyparser for json requests
app.use(bodyParser.json());

// add errorhandler middleware
app.use(errorHandler);

// add cookie parser 
app.use(cookieParser());

// add routes
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/cars', carRouter);
app.use('/attendances', attendanceRouter);
app.use('/carParts', carPartsRouter);
// define port 
const port = process.env.PORT || 5000;


// apply cors middleware to allow access from browser
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});