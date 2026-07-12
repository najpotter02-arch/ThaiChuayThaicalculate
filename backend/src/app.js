import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import usageRoutes from "./routes/expense.routes.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  const users = await prisma.user.count();

  res.json({
    message: "Thai Chuay Thai API",
    users,
  });
});
app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/usage", usageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;