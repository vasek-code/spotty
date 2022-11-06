import { User } from "../../../backend/node_modules/@prisma/client";
import { fetchServer } from "../utils/fetchServer";

export const getMe = async (token: string) => {
  const res = await fetchServer("user/me", "GET", token, undefined);

  return res;
};
