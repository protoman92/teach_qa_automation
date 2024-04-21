export * from "./constant";
export * from "./validator";

export function keyof<T, K extends keyof T = keyof T>(key: K): K {
  return key;
}
