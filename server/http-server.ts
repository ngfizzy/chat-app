import cors from "cors";
import express from "express";
import { createServer } from "http";
// import fs from "fs";
// import path from "path";

export const app = express();

app.use(cors());
app.use(express.json());

// const options = {
//   key: fs
//     .readFileSync(path.join(__dirname, "/privateKey.key"), "utf8")
//     .toString(),
//   cert: fs
//     .readFileSync(path.join(__dirname, "/certificate.crt"), "utf8")
//     .toString(),
// };

export const httpServer = createServer(app);
