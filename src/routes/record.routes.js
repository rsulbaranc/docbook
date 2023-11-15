import Router from 'express-promise-router'
import {
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import {isAuth} from '../middlewares/auth.middleware.js'
const router = Router();

router.get("/records", isAuth, getRecords);

router.get("/record/:id", getRecord);

router.post("/record", createRecord);

router.put("/record/:id", updateRecord);

router.delete("/record/:id", deleteRecord);

export default router;
