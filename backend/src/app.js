import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import Security from "./controllers/bo/Security.js";

import recordRoutes from "./routes/record.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => { res.json({ message: "Welcome to docbook api" }); });

app.use("/api", recordRoutes);
app.use("/api", authRoutes);

//Create admin
const security = new Security();
security.init();

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({ 
        status: "server error",
        message: err.message 
    });
})

export default app;