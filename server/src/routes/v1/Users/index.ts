import { Router } from "express";
import UserController from "./controller";

const UserRouter = Router({mergeParams: true});

UserRouter.post('/verify/:otp/:email', UserController.verifyOtp);

export default UserRouter;