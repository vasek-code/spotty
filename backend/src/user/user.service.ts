import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOneById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comments: true,
        markers: true,
      },
    });

    if (!user) throw new NotFoundException("user doesn't exist");

    delete user.hash;
    delete user.updated;

    return user;
  }

  async getBestFinders() {
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

    const users = await this.prisma.user.findMany();

    const comments = await this.prisma.comment.findMany();

    const markers = await this.prisma.marker.findMany();

    users.forEach((creator) => {
      const places = markers.filter(
        (marker) => marker.creatorId === creator.id
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
        const markerFromComment = markers.find(
          (marker) => marker.id === comment.markerId
        );

        if (markerFromComment.creatorId === creator.id) {
          const oldBestPlace = bestPlacesMap.get(markerFromComment.id);

          if (!oldBestPlace) {
            bestPlacesMap.set(markerFromComment.id as string, {
              id: markerFromComment.id as string,
              totalStars: comment.stars,
              title: markerFromComment.title,
            });
          } else {
            bestPlacesMap.set(markerFromComment.id as string, {
              id: markerFromComment.id as string,
              totalStars: oldBestPlace.totalStars + comment.stars,
              title: markerFromComment.title,
            });
          }

          const oldMapRecord = mapOfFinders.get(creator.id);
          if (!oldMapRecord) {
            mapOfFinders.set(creator.id, {
              id: creator.id,
              totalStars: comment.stars,
              totalVotes: 1,
              avatarUrl: creator.avatarUrl as string,
              name: creator.name ?? creator.email.split("@")[0],
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
              totalStars: oldMapRecord.totalStars + comment.stars,
              totalVotes: oldMapRecord.totalVotes + 1,
              avatarUrl: creator.avatarUrl as string,
              name: creator.name ?? creator.email.split("@")[0],
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

    const finalCreatorsArray = Object.values(Object.fromEntries(mapOfFinders));

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
  }
}
