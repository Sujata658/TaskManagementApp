import { Router } from "express";
import TagsController from "./controller";

const TagsRouter = Router({mergeParams: true});

TagsRouter.post('/', TagsController.createTag)

TagsRouter.get('/:tagId', TagsController.getTag)

TagsRouter.get('/', TagsController.getAllTags)

TagsRouter.get('/:tag', TagsController.getTasksByTag)


export default TagsRouter;