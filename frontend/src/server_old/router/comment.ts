import { z } from "zod";
import { CommentRecordType } from "../../types/CommentRecordType";
import { createRouter } from "./context";

export const commentRouter = createRouter()
  .mutation("create", {
    input: z.object({
      markerId: z.string(),
      stars: z.number().min(1).max(5),
      body: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(input);

      ctx.client.authStore.loadFromCookie(ctx.req.headers.cookie as string);

      const comment = await ctx.client.records.create("comments", {
        creator: ctx.client.authStore.model?.id,
        ...input,
      });

      return comment as never as CommentRecordType;
    },
  })
  .query("getAllPerMarkerId", {
    input: z.object({
      markerId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const comments = await ctx.client.records.getFullList(
        "comments",
        undefined,
        { filter: `markerId = "${input.markerId}"` }
      ) as never as CommentRecordType[];

      return comments.reverse();
    },
  });
