import express from "express";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserByName,
  getUsers,
} from "../db/users";
import { redisClient } from "../index";

const DEFAULT_EXPIRATION = 3600;

export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }).end();
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

export const getAllUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAUserByName = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username } = await req.query;
    const fetchedData = [] as any[];
    const newData = await redisClient
      .get(username as string)
      .catch((err: any) => res.status(500).send(err));
    if (newData === null) {
      const data = await getUserByName(username as string);
      if (data && Object.keys(data).length > 0) {
        redisClient.setEx(
          username as string,
          DEFAULT_EXPIRATION,
          JSON.stringify(data)
        );
        fetchedData.push(data);
      }
    } else {
      fetchedData.push(JSON.parse(newData as string));
    }
    res.json(fetchedData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
