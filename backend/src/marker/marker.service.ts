import { Injectable } from "@nestjs/common";

import { RequestUser } from "src/auth/strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { MarkerCreateDto } from "./dto";

@Injectable()
export class MarkerService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const markers = await this.prisma.marker.findMany();

    return markers;
  }

  async create(dto: MarkerCreateDto, user: RequestUser) {
    const marker = await this.prisma.marker.create({
      data: {
        description: dto.description,
        lat: dto.lat,
        lng: dto.lng,
        title: dto.title,
        hashtags: dto.hashtags,
        images: dto.images,
        creatorId: user.id,
      },
    });

    return marker;
  }

  async getAllByCreatorId(userId: string) {
    const markers = await this.prisma.marker.findMany({
      where: {
        creatorId: userId,
      },
    });

    return markers;
  }
}
