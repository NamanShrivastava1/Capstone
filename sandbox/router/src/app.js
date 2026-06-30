import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use((req, res, next) => {
  const host = req.headers.host;
  const sandboxId = host.split(".")[0];
});

export default app;
