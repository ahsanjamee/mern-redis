import express from "express";

import { createNewUser } from "../controllers/userController";

export default (router: express.Router) => {
  router.post("/user/create", createNewUser);
};
