import cors from "cors";
import express from "express";
// import { createServer } from "https";
import path from "path";
import spdy from "spdy";
import fs from "fs";
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

export const httpServer = spdy.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "localhost-private.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost-cert.pem")),
  },
  app
);
