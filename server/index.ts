import dotenv from "dotenv";
import { Response, Request } from "express";
import { connect, set as setMongooseConfig } from "mongoose";
import { authRouter, userRouter, conversationRouter } from "./routes";
import { authMiddleware } from "./middleware";
import { app, httpServer } from "./http-server";

dotenv.config();

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "hello" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/conversations", authMiddleware, conversationRouter);

setMongooseConfig("useCreateIndex", true);
connect(process.env.DB_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected successfully 🚀");

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server started successfully on port ${process.env.PORT}. 🚀'`);
  });
});
