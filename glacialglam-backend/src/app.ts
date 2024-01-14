import { Application } from "express";
import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "./app/middleware/errorHandler";
import router from "./app/routes";

const app: Application = express();


app.use(cors());
app.use(express.json());
// Routes
app.use("/", router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to ProductExplorerHub API",
  });
});

// error handler
app.use(errorHandler);

export default app;
