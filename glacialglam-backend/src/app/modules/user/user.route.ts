import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import {
  changePasswordValidation,
  createUserValidation,
  loginUserValidation,
} from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import { upload } from "../../utils/sendImageInCloudinary";
import auth from "../../middleware/auth";
const router = express.Router();
router.post(
  "/register",
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(createUserValidation),
  UserControllers.UserController
);

//get my profile
router.get("/myProfile",
  auth("user","admin"),
  UserControllers.getMyProfileController);


  //admin get all users start

  router.get("/allUsers",
  auth("admin"),
  UserControllers.getAllUsersController);

router.get("/user/:userId",
  auth("admin"),
  UserControllers.getUserByIdController);

  router.delete("/user/:userId",
  auth("admin"),
  UserControllers.deleteUserByIdController);


  // admin end

  //update user
  router.put("/user/:userId",
  auth("user","admin"),
  UserControllers.updateProfileController);



// login
router.post("/login", UserControllers.userLoginController);

router.post(
  "/change-password",
  // validateRequest(changePasswordValidation),
  UserControllers.changePasswordController
);

export const UserRouters = router;
