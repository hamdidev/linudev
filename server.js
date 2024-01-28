import { app } from "./app.js";
import * as dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();

// create a server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
