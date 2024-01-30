import express from "express";
import bodyParser from "body-parser";
export const app = express();
import "dotenv/config.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

app.use(express.json({ limit: "50mb" }));

// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//   })
// );
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.disable("x-power-by");

app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/user", userRouter);
