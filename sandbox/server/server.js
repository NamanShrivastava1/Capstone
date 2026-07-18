import "dotenv/config";
import app from "./src/app.js";

app.listen(3000, () => {
  console.log("Sandbox API is running on 3000");
});
