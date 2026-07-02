import express from "express";
import morgan from "morgan";
import fs from "fs";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from sandbox agent",
    status: "success",
  });
});

export default app;
