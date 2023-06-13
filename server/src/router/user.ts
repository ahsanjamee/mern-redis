import express from "express";

import {
  createNewUser,
  getAUserByName,
  getAllUser,
} from "../controllers/userController";

export default (router: express.Router) => {
  router.post("/user/create", createNewUser);
  router.get("/", getAllUser);
  router.get("/user", getAUserByName);
};
