import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Signin, Signup, Update } from "./routes";
import cors from "cors"

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", Signup);
app.use("/api/v1", Signin);
app.use("/api/v1", Update);

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log(`Listening to port ${port}`);
});
