// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase"
import { client } from "../../utils/pocketbase"

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  req: NextApiRequest;
  res: NextApiResponse;
  client: PocketBase;
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    res: opts.res,
    client: client
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  return await createContextInner({
    req: opts.req,
    res: opts.res,
    client: client
  });
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
