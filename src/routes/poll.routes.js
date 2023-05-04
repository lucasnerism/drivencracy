import { Router } from "express";

const pollRouter = Router();

pollRouter.post("/poll");
pollRouter.get("/poll");
pollRouter.get("/poll/:id");
pollRouter.get("/poll/:id/result");

export default pollRouter;