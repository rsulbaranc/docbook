import { Router } from "express";
import {
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
const router = Router();

router.get("/records", getRecords);

router.get("/record/:id", getRecord);

router.post("/record/:id", createRecord);

router.put("/record/:id", updateRecord);

router.delete("/record/:id", deleteRecord);

export default router;
