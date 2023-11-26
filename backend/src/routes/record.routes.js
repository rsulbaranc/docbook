import Router from 'express-promise-router'
import {
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import {process} from "../controllers/process.controller.js";
import {isAuth} from '../middlewares/auth.middleware.js'
const router = Router();

router.get("/records", isAuth, getRecords);

router.get("/record/:id", getRecord);

router.post("/record", isAuth, createRecord);

router.put("/record/:id", updateRecord);

router.delete("/record/:id", deleteRecord);


router.post("/process", isAuth, process)

export default router;
