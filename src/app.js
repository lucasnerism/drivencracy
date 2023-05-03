import express from "express";
import cors from "cors";
import "dotenv/config.js";
import ConnectDatabase from "./database/connect.js";
import router from "./routes/index.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

ConnectDatabase();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));