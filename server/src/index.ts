import express from "express";
import cors from "cors";
import authRoutes from "./routers/auth.js";
import transactionsRoutes from "./routers/transactions.js";
import accountsRoutes from "./routers/accounts.js";

const app = express();
const PORT = process.env.PORT || 8080;
const LOCALHOST = process.env.LOCALHOST || "http://localhost:5173";

// Basic middleware setup - Consider additional security middleware
app.use(
  cors({
    origin: ["*", LOCALHOST],
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/accounts", accountsRoutes);

app.get("/", (req, res) => {
  res.send("My server is ready!!!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
