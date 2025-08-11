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

const corsOptions: import("cors").CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Explicitly respond to preflight requests
app.options("*", cors(corsOptions));


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

export { app };