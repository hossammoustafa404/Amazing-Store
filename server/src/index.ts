import "reflect-metadata";
import "express-async-errors";
import * as express from "express";
import config from "./config/config";
import errorHandler from "./middlewares/errorHandler";
import * as cors from "cors";
import helmet from "helmet";
import appRouter from "./routes";
import { connectDB } from "./config/db";
import passportFn from "./config/passport";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// passport
passportFn();
passport.initialize();

// Routes
app.use("/api/v1", appRouter);

// Global Error Handler Middleware
app.use(errorHandler);

const start = async () => {
  const port = config.app.port;

  await connectDB();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};
start();
