import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/index.js";
import clientsRouter from "./routes/clients.js";
import usersRouter from "./routes/users.js";
import servicesRouter from "./routes/services.js";
import portfoliosRouter from "./routes/portfolio.js";

const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true,
// }));

app.use(cors({
  origin: function(origin, callback) {
    // Autoriser requêtes sans origin (Postman, mobile)
    if (!origin) return callback(null, true);
    const allowed = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "https://vikolab.vercel.app"
    ];
    if (allowed.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));

app.use(express.json());

// Charger la session sur chaque requête
app.use(async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    req.user = session?.user || null;
    req.session = session?.session || null;
  } catch {
    req.user = null;
    req.session = null;
  }
  next();
});

// Routes Better Auth (login, logout, session)
app.all("/api/auth/*splat", toNodeHandler(auth));

// Routes métier
app.use("/api/clients", clientsRouter);
app.use("/api/users", usersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/portfolios", portfoliosRouter);

app.get("/", (req, res) => res.json({ status: "CRM API running" }));

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});