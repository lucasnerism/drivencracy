import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { choiceSchema } from "../schemas/choice.schema.js";
import choiceController from "../controllers/choice.controller.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validateSchema(choiceSchema), choiceController.createChoice);
choiceRouter.post("/choice/:id/vote", choiceController.postAVote);

export default choiceRouter;