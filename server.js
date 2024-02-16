import { app } from "./app.js";
import * as dotenv from "dotenv";
import connectDB from "./utils/db.js";
import express from "express";
import path from "path";
dotenv.config();

// create a server

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
