import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./src/connections/Db";
import { errorHandler } from "./src/middlewares/errorMiddleware";
import loggerMiddleware from "./src/middlewares/loggerMiddleware";
import customerRouter from "./src/routes/customerRouter";
import employeeRouter from "./src/routes/employeeRouter";
import carRouter from "./src/routes/carRouter";
import attendanceRouter from "./src/routes/attendanceRouter";
import carPartsRouter from "./src/routes/carPartsRouter";
import supplierRouter from "./src/routes/supplierRouter";
import userRouter from "./src/routes/userRouter";
import salaryRouter from "./src/routes/salaryRouter";
import billRouter from "./src/routes/billRouter";
import workRouter from "./src/routes/workRouter";
import deductibleRouter from "./src/routes/deductibleRouter";
import installmentRouter from "./src/routes/installmentRouter";

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

// const allowedOrigins = [
//   "http://26.107.169.142:8080",
//   "http://localhost:8080",
//   "https://preview--gas-auto-pilot-system.lovable.app/",
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

app.use(cors());


// add routes
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/cars', carRouter);
app.use('/attendances', attendanceRouter);
app.use('/carParts', carPartsRouter);
app.use('/suppliers', supplierRouter);
app.use('/users', userRouter);
app.use("/salaries", salaryRouter)
app.use("/bills", billRouter);
app.use("/works", workRouter);
app.use("/deductibles", deductibleRouter);
app.use("/installments", installmentRouter);

app.get("/", (req, res) => {
  res.json({message: "Hello From Gas Auto Service!"});
})

// add error handler middleware (after routes)
app.use(errorHandler);

// define port 
const port = process.env.PORT || 5000;

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});