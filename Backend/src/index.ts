import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./connections/Db";
import { errorHandler } from "./middlewares/errorMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import customerRouter from "./routes/customerRouter";
import employeeRouter from "./routes/employeeRouter";
import carRouter from "./routes/carRouter";
import attendanceRouter from "./routes/attendanceRouter";
import carPartsRouter from "./routes/carPartsRouter";
import supplierRouter from "./routes/supplierRouter";
import userRouter from "./routes/userRouter";

// load dotenv file
dotenv.config({quiet: true});

// connect to mongo database
connectToDB().then(() => console.log("Connected to MongoDB Successfully.")).catch((e) => { if(e) console.error(`Error in DB: ${e}`) } );

// define express app
const app = express();

// add bodyparser for json requests
app.use(bodyParser.json());

// request/response logger (before routes)
app.use(loggerMiddleware);

// add cookie parser 
app.use(cookieParser());

const allowedOrigins = [
  "http://26.107.169.142:8080",
  "http://localhost:8080"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// add routes
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/cars', carRouter);
app.use('/attendances', attendanceRouter);
app.use('/carParts', carPartsRouter);
app.use('/suppliers', supplierRouter);
app.use('/users', userRouter);


// add errorhandler middleware (after routes)
app.use(errorHandler);
// define port 
const port = process.env.PORT || 5000;



// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});