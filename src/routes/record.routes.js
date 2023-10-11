import { Router } from "express";
const router = Router();

router.get("/record", (req, res) =>
  res.send("Getting records from the database...")
);

router.get("/record/:id", (req, res) =>
  res.send("Getting record from the database...")
);

router.post("/record/:id", (req, res) => {
    res.send("Posting record to the database...")
});

router.put("/record/:id", (req, res) => {
    res.send("Updating record in the database...")
});

router.delete("/record/:id", (req, res) => {
    res.send("Deleting record from the database...")
});

export default router;
