// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user";
import { markerRouter } from "./marker";
import { imageRouter } from "./image";
import { commentRouter } from "./comment";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("marker.", markerRouter)
  .merge("image.", imageRouter)
  .merge("comment.", commentRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
