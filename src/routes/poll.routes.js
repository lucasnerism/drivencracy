import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { pollSchema } from "../schemas/poll.schema.js";
import pollController from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.post("/poll", validateSchema(pollSchema), pollController.postPoll);
pollRouter.get("/poll", pollController.getAllPolls);
pollRouter.get("/poll/:id/choice", pollController.getPollById);
pollRouter.get("/poll/:id/result", pollController.getResult);

export default pollRouter;