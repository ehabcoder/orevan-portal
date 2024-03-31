import express from "express";
import path from "path";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
config();
connectDB();

const __dirname = path.resolve();

const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);

// In production we are sitting the frontend folder into a static folder
// and then any route that is not in our route(that you can see above)
// it will point to the html file in the static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Orevan/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "../",
        "Orevan",
        "frontend",
        "build",
        "index.html"
      )
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
