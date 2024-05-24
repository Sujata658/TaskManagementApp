import { Router } from "express";
import TagsController from "./controller";

const TagsRouter = Router({mergeParams: true});

TagsRouter.post('/', TagsController.createTag)

TagsRouter.get('/:taskId', TagsController.getTag)

TagsRouter.get('/', TagsController.getAllTags)

TagsRouter.get('/:tagId', TagsController.getTasksByTag)


export default TagsRouter;