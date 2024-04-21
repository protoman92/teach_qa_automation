// @ts-check
import assert from "assert";
import { ObjectId } from "bson";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { MongoClient, MongoServerError } from "mongodb";
import { type User } from "./interface";
import { CONSTANTS, createUserValidator, keyof } from "./utils";
import { StatusCodes } from "http-status-codes";

dotenv.config({});

const mongodbUri = process.env.MONGODB_URI;
assert(mongodbUri !== undefined, "MongoDB URI not found");

const mongoClient = new MongoClient(mongodbUri);
let mongodb: ReturnType<(typeof mongoClient)["db"]>;

const app = express();

app.use(express.json());

app.get("/", (...[, res]) => {
  res.send("Hello world");
});

async function handleErrorWithinMiddleware(
  handle: () => Promise<void>,
  next: NextFunction
): Promise<void> {
  try {
    await handle();
  } catch (error) {
    next(error);
  }
}

app.get("/api/v1/user/:id", async (req, res, next) => {
  await handleErrorWithinMiddleware(async () => {
    const user = await mongodb
      .collection<User>(CONSTANTS.MONGODB_COLLECTION_USER)
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    res.json(user);
  }, next);
});

app.post("/api/v1/users", async (req, res, next) => {
  await handleErrorWithinMiddleware(async () => {
    const { error: valiationError, value: createUserData } =
      createUserValidator.validate(req.body);

    if (valiationError !== undefined) {
      res.status(StatusCodes.BAD_REQUEST).send(valiationError.message);
      return;
    }

    assert(createUserData !== undefined);

    const { insertedId } = await mongodb
      .collection<User>(CONSTANTS.MONGODB_COLLECTION_USER)
      .insertOne(createUserData);

    const user = await mongodb
      .collection<User>(CONSTANTS.MONGODB_COLLECTION_USER)
      .findOne({
        _id: insertedId,
      });

    res.json(user);
  }, next);
});

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err);
    res.status(500).send(err.message);
  }
);

const port = parseInt(process.env.PORT || "3000", 10);

app.listen(port, async () => {
  console.log(`Listening at port ${port}`);

  await mongoClient.connect();
  mongodb = mongoClient.db("test-server");

  const userIndexInformation = await mongodb.indexInformation(
    CONSTANTS.MONGODB_COLLECTION_USER
  );

  if (userIndexInformation[`${keyof<User>("email")}_1`] === undefined) {
    await mongodb.createIndex(
      CONSTANTS.MONGODB_COLLECTION_USER,
      {
        [keyof<User>("email")]: 1,
      },
      {
        unique: true,
      }
    );
  }
});
