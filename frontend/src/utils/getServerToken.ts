import { cookies } from "next/headers";

export const getServerToken = () => {
  const cookiesList = cookies();

  const token = cookiesList.get("spotty_auth")?.value;

  return token;
};
