import { Injectable } from "@nestjs/common";
import { RequestUser } from "src/auth/strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentCreateDto } from "./dto/create.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CommentCreateDto, user: RequestUser) {
    const comment = await this.prisma.comment.create({
      data: {
        body: dto.body,
        stars: dto.stars,
        creatorId: user.id,
        markerId: dto.markerId,
      },
    });

    return comment;
  }

  async getAllByMarkerId(markerId: string) {
    const comments = await this.prisma.comment.findMany({
      where: {
        markerId,
      },
    });

    return comments;
  }
}
