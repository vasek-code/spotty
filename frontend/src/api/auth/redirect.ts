import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import { client } from "../../utils/pocketbase";

const RedirectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.cookies.provider);

  const provider = JSON.parse(req.cookies.provider as string);

  const user = await client.users.authViaOAuth2(
    provider.name,
    req.query.code as string,
    provider.codeVerifier,
    `${env.URL}/api/auth/redirect`
  );

  await client.records.update("profiles", user.user.profile?.id as string, {
    avatarUrl: user.meta.avatarUrl,
    name: user.meta.name,
  });

  res.setHeader("set-cookie", client.authStore.exportToCookie());

  res.redirect("/");
};

export default RedirectHandler;
