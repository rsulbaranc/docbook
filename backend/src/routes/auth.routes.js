import Router  from "express-promise-router";
import {
  signin,
  signup,
  signout,
  profile,
  user
} from "../controllers/auth.controller.js";
import {isAuth} from '../middlewares/auth.middleware.js'
import {validateSchema} from '../middlewares/validate.middleware.js'
import {userLogin} from '../schemas/auth.schema.js'



const router = Router();

router.post("/signin", validateSchema(userLogin), signin);

router.post("/signup", signup);

router.post("/signout", signout);

router.get("/profile", isAuth, profile);

router.post("/getUser", isAuth, user);

export default router;
