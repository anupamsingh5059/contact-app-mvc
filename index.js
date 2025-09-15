import express from "express";
import { connectDB } from "./config/database.js";
import contactRoutes from "./routes/contacts.routes.js";

const app = express();
const PORT = 3000;

// DB connect
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
