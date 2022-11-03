import { z } from "zod";
import { MarkerRecordType } from "../../types/MarkerRecordType";
import { createRouter } from "./context";

export const markerRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      const markers = await ctx.client.records.getFullList("markers");

      return markers as never as MarkerRecordType[];
    },
  })
  .mutation("create", {
    input: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      hashtags: z.array(z.string().min(1).max(20)).max(12).min(1),
      title: z.string().min(3),
      description: z.string().min(20),
      images: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      ctx.client.authStore.loadFromCookie(ctx.req.headers.cookie as string);

      const marker = (await ctx.client.records.create("markers", {
        ...input,
        creator: ctx.client.authStore.model?.id,
      })) as never as MarkerRecordType;

      return marker;
    },
  })
  .query("getAllByCreatorId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      ctx.client.authStore.loadFromCookie(ctx.req.headers.cookie as string);

      const markers = (await ctx.client.records.getFullList(
        "markers",
        undefined,
        {
          filter: `creator = "${input.id}"`,
        }
      )) as never as MarkerRecordType[];

      return markers;
    },
  });
