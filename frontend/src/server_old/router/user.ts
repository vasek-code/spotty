import { createRouter } from "./context";
import { z } from "zod";
import { MarkerRecordType } from "../../types/MarkerRecordType";
import { User } from "pocketbase";
import { CommentRecordType } from "../../types/CommentRecordType";

export const userRouter = createRouter()
  .mutation("register", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.client.users.create({
        email: input.email,
        password: input.password,
        passwordConfirm: input.passwordConfirm,
      });

      await ctx.client.users.authViaEmail(input.email, input.password);

      ctx.res.setHeader("set-cookie", ctx.client.authStore.exportToCookie());

      return {
        token: ctx.client.authStore.exportToCookie(),
      };
    },
  })
  .mutation("signIn", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.client.users.authViaEmail(input.email, input.password);

      ctx.res.setHeader("set-cookie", ctx.client.authStore.exportToCookie());

      return {
        token: ctx.client.authStore.exportToCookie(),
      };
    },
  })
  .query("getAuthMethods", {
    resolve: async ({ ctx }) => {
      const authMethods = await ctx.client.users.listAuthMethods();

      return authMethods;
    },
  })
  .query("getSession", {
    resolve: async ({ ctx }) => {
      try {
        ctx.client.authStore.loadFromCookie(ctx.req.headers.cookie as string);

        const user = await ctx.client.users.getOne(
          ctx.client.authStore.model?.id as string
        );

        const filteredUser = {
          id: user.id,
          avatarUrl: user.profile?.avatarUrl as string,
          name: user.profile?.name as string,
          email: user.email,
        };

        return filteredUser;
      } catch (e) {
        return null;
      }
    },
  })
  .mutation("removeToken", {
    resolve: async ({ ctx }) => {
      ctx.res.setHeader("set-cookie", "pb_auth=; path=/;");
    },
  })
  .query("getOneById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.client.admins.authViaEmail(
        "vasik1234541@gmail.com",
        "Kokotbananekmuj.OO"
      );

      const user = await ctx.client.users.getOne(input.id);

      const filteredUser = {
        id: user.id,
        avatarUrl: user.profile?.avatarUrl as string,
        name: user.profile?.name as string,
        email: user.email,
        created: user.created,
      };

      return filteredUser;
    },
  })
  .query("getBestFinders", {
    resolve: async ({ ctx }) => {
      await ctx.client.admins.authViaEmail(
        "vasik1234541@gmail.com",
        "Kokotbananekmuj.OO"
      );

      const mapOfFinders = new Map<
        string,
        {
          id: string;
          totalStars: number;
          totalVotes: number;
          avatarUrl: string;
          name: string;
          totalPlaces: number;
          bestPlace: {
            id: string;
            title: string;
          };
        }
      >();

      const allUsersThatCreatedPlace = await ctx.client.users.getFullList();

      const comments = (await ctx.client.records.getFullList(
        "comments"
      )) as never as CommentRecordType[];

      const markers = (await ctx.client.records.getFullList(
        "markers"
      )) as never as MarkerRecordType[];

      allUsersThatCreatedPlace.forEach((creator) => {
        const places = markers.filter(
          (marker) => marker.creator === creator.id
        );

        const bestPlacesMap = new Map<
          string,
          {
            id: string;
            title: string;
            totalStars: number;
          }
        >();

        comments.forEach(async (comment) => {
          const markerFromComment: MarkerRecordType = markers.find(
            (marker) => marker.id === comment.markerId
          ) as MarkerRecordType;

          if (markerFromComment.creator === creator.id) {
            const oldBestPlace = bestPlacesMap.get(markerFromComment.id);

            if (!oldBestPlace) {
              bestPlacesMap.set(markerFromComment.id as string, {
                id: markerFromComment.id as string,
                totalStars: parseInt(comment.stars),
                title: markerFromComment.title,
              });
            } else {
              bestPlacesMap.set(markerFromComment.id as string, {
                id: markerFromComment.id as string,
                totalStars: oldBestPlace.totalStars + parseInt(comment.stars),
                title: markerFromComment.title,
              });
            }

            const oldMapRecord = mapOfFinders.get(creator.id);
            if (!oldMapRecord) {
              mapOfFinders.set(creator.id, {
                id: creator.id,
                totalStars: parseInt(comment.stars),
                totalVotes: 1,
                avatarUrl: creator.profile?.avatarUrl as string,
                name: creator.profile?.name ?? creator.email.split("@")[0],
                get bestPlace() {
                  const bestPlaceArray = Object.values(
                    Object.fromEntries(bestPlacesMap)
                  );

                  bestPlaceArray.sort((a, b) => {
                    if (a.totalStars > b.totalStars) {
                      return -1;
                    }

                    if (a.totalStars < b.totalStars) {
                      return 1;
                    }

                    return 0;
                  });

                  return {
                    id: bestPlaceArray[0]?.id as string,
                    title: bestPlaceArray[0]?.title as string,
                  };
                },
                totalPlaces: places.length,
              });
            } else {
              mapOfFinders.set(creator.id, {
                id: creator.id,
                totalStars: oldMapRecord.totalStars + parseInt(comment.stars),
                totalVotes: oldMapRecord.totalVotes + 1,
                avatarUrl: creator.profile?.avatarUrl as string,
                name: creator.profile?.name ?? creator.email.split("@")[0],
                get bestPlace() {
                  const bestPlaceArray = Object.values(
                    Object.fromEntries(bestPlacesMap)
                  );

                  const [bestPlace] = bestPlaceArray.sort((a, b) => {
                    if (a.totalStars > b.totalStars) {
                      return -1;
                    }

                    if (a.totalStars < b.totalStars) {
                      return 1;
                    }

                    return 0;
                  });

                  console.log(bestPlaceArray);

                  return {
                    id: bestPlace?.id as string,
                    title: bestPlace?.title as string,
                  };
                },
                totalPlaces: places.length,
              });
            }
          }
        });
      });

      const finalCreatorsArray = Object.values(
        Object.fromEntries(mapOfFinders)
      );

      finalCreatorsArray.sort((a, b) => {
        const firstAverageRating = a.totalStars / a.totalVotes;
        const secondAverageRating = b.totalStars / b.totalVotes;

        if (firstAverageRating > secondAverageRating) return -1;

        if (firstAverageRating < secondAverageRating) return 1;

        return 0;
      });

      finalCreatorsArray.forEach((creator, index) => {
        const arrayCopy = [...finalCreatorsArray];

        arrayCopy[index];
      });

      return finalCreatorsArray;
    },
  });
