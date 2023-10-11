import { Router } from "express";

const router = Router();

router.post("/signin", (req, res) => res.send("signin"));

router.post("/signup", (req, res) => res.send("signup"));

router.post("/signout", (req, res) => res.send("signout"));

export default router;
