import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { AccountRouter } from "./routes/accountRoutes";
import { UserRouter } from "./routes/userRoutes";
import cors from "cors"

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/account", AccountRouter);

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log(`Listening to port ${port}`);
});
