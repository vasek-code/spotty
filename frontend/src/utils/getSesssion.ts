import { headers } from "next/headers";
import Pocketbase from "pocketbase";
import { env } from "../env/server.mjs";

export const getSession = async () => {
  const client = new Pocketbase(env.POCKETBASE_URL);
  const headersList = headers();

  try {
    client.authStore.loadFromCookie(headersList.get("cookie") as string);

    const user = await client.users.getOne(
      client.authStore.model?.id as string
    );

    const filteredUser = {
      id: user.id,
      avatarUrl: user.profile?.avatarUrl as string,
      name: user.profile?.name as string,
      email: user.email,
    };

    console.log(filteredUser);

    return filteredUser;
  } catch (e) {
    return null;
  }
};
