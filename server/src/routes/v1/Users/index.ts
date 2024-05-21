import { Router } from "express";
import UserController from "./controller";

const users = Router();

users.post('/signup', UserController.createUser)

users.patch('/:id', UserController.)

export default users;