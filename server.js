import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import errorHandler from "./src/helpers/errorhandler.js";
import tasksRoutes from "./src/routes/tasksRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

//Load env first
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

//routes
app.use("/api/users", userRoutes);

app.use("/api/tasks", tasksRoutes);

// error handler middleware
app.use(errorHandler);

const server = async () => {
  try {
    await connect();

    app.listen(port, "0.0.0.0",() => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();
