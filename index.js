import express from "express";
import { connectDB } from "./config/database.js";
import contactRoutes from "./routes/contacts.routes.js";

const app = express();

// DB Connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/", contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
