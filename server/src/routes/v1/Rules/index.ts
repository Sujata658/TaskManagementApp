import { Router } from "express";
import requireUser from "../../../middleware/requireUser";
import RuleController from "./controller";

const RuleRouter = Router();

// Get rules
RuleRouter.route('/:id/rules').get(requireUser, RuleController.getRules);


// Update rules
RuleRouter.route('/:id/rules').patch(requireUser, RuleController.updateRules);


export default RuleRouter;