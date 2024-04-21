import { StatusCodes } from "http-status-codes";

export * from "./constant";
export * from "./validator";

export class HttpError extends Error {
  constructor(readonly status: StatusCodes, readonly sourceError: Error) {
    super(sourceError.message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export function keyof<T, K extends keyof T = keyof T>(key: K): K {
  return key;
}
