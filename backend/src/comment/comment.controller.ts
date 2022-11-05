import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { RequestUser } from "src/auth/strategy";
import { CommentService } from "./comment.service";
import { CommentCreateDto } from "./dto/create.dto";

@UseGuards(JwtGuard)
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post("create")
  async create(@Body() body: CommentCreateDto, @GetUser() user: RequestUser) {
    return await this.commentService.create(body, user);
  }

  @Get("by-marker-id/:markerId")
  async getAllByMarkerId(@Param("markerId") markerId: string) {
    return await this.commentService.getAllByMarkerId(markerId);
  }
}
