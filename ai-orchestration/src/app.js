import expres from "express";
import morgan from "morgan";

const app = expres();

app.use(morgan("dev"));
app.use(expres.json());

app.get("/api/status/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/api/ai/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;
