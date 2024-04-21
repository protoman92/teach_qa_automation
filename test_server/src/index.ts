// @ts-check
import assert from "assert";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Sequelize, UniqueConstraintError } from "sequelize";
import UserModel, { init as initUserModel } from "./model/user";
import { HttpError, createUserValidator } from "./utils";

dotenv.config({});

const sqlUri = process.env.SQL_URI;
assert(sqlUri !== undefined, "SQL_URI not found");

const sqlClient = new Sequelize(sqlUri, {
  logging: false,
});

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
    const userModel = await UserModel.findByPk(req.params.id);

    if (userModel === null) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        new Error("Record does not exist")
      );
    }

    res.json(userModel.toJSON());
  }, next);
});

app.post("/api/v1/users", async (req, res, next) => {
  await handleErrorWithinMiddleware(async () => {
    const { error: valiationError, value: createUserData } =
      createUserValidator.validate(req.body);

    if (valiationError !== undefined) {
      throw new HttpError(StatusCodes.BAD_REQUEST, valiationError);
    }

    assert(createUserData !== undefined);

    try {
      const userModel = await UserModel.create(createUserData, {
        returning: true,
        validate: true,
      });

      res.json(userModel.toJSON());
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new HttpError(StatusCodes.CONFLICT, error);
      } else {
        throw error;
      }
    }
  }, next);
});

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof HttpError) {
      console.log(err.sourceError);
      res.status(err.status).send(err.message);
    } else {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

const port = parseInt(process.env.PORT || "3000", 10);

app.listen(port, async () => {
  console.log(`Listening at port ${port}`);

  initUserModel({
    sequelize: sqlClient,
  });
});
