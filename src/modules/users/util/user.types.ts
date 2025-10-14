export const Roles = {
  ADMIN: "ADMIN",
  COACH: "COACH",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
