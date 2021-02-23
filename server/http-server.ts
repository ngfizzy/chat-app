import cors from "cors";
import express from "express";
import { createServer } from "http";

export const app = express();

app.use(cors());
app.use(express.json());

export const httpServer = createServer(app);
