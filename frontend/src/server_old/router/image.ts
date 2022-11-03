import { z } from "zod";
import { ImageRecordType } from "../../types/ImageRecordType";
import { createRouter } from "./context";

export const imageRouter = createRouter()
  .query("getOneById", {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ ctx, input }) => {
      const images = await ctx.client.records.getOne("images", input.id);

      return images as never as ImageRecordType;
    },
  })
