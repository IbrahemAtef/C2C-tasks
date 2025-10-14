import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { getEnvOrThrowError } from "../../../shared/utils/util";
import { Role } from "../../users/util/user.types";

export type JWT_PAYLOAD = { sub: string; role: Role };

const JWT_SECRET = getEnvOrThrowError("JWT_SECRET");

export const singJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};
