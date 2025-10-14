import { randomUUID } from "crypto";
import { MyEnvs } from "./declaration-merging.types";

export const getEnvOrThrowError = <k extends keyof MyEnvs>(
  envName: k
): MyEnvs[k] => {
  const envValue = process.env[envName];
  if (!envName) throw new Error("env is missing " + envName);
  return envValue;
};

/**
 * Generate a unique ID for entities
 */
export function newId(): string {
  return randomUUID();
}

/**
 * Return the current timestamp
 */
export function now(): Date {
  return new Date();
}
