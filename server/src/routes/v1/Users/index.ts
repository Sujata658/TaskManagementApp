import { Router } from "express";
import UserController from "./controller";

const users = Router();

users.post('/verify', UserController.verifyOtp);

export default users;