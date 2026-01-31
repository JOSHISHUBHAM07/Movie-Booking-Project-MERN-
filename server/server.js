import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be FIRST

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/inngest.js";
import showRouter from "./routes/showRoutes.js";



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// connect DB safely
connectDB().catch(console.error);

app.get("/", (req, res) => res.send("Server is live!"));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Show routes
app.use("/api/show", showRouter);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);
