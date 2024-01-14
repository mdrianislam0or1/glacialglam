import express from "express";
import { UserControllers } from "./user.controller";
import {
  changePasswordValidation,
  createUserValidation,
  loginUserValidation,
} from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();
router.post(
  "/register",
  // validateRequest(createUserValidation),
  UserControllers.UserController
);

router.post("/login", UserControllers.userLoginController);

router.post(
  "/change-password",
  // validateRequest(changePasswordValidation),
  UserControllers.changePasswordController
);

export const UserRouters = router;
