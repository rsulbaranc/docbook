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

router.get("/record/:id", isAuth, getRecord);

router.post("/record", isAuth, createRecord);

router.put("/record/:id", isAuth, updateRecord);

router.delete("/record/:id", isAuth, deleteRecord);


router.post("/process", process)

export default router;
