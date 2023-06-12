import { createUser, getUserByEmail } from "../db/users";
import express from "express";

export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log(req.body);
    const { email, username } = req.body;

    if (!email || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      email,
      username,
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
