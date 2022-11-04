import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { JwtGuard } from "src/auth/guard";
import { RequestUser } from "src/auth/strategy";
import { MarkerCreateDto } from "./dto";
import { MarkerService } from "./marker.service";
import { GetUser } from "src/auth/decorator";

@UseGuards(JwtGuard)
@Controller("marker")
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  @Get("all")
  async getAll() {
    return await this.markerService.getAll();
  }

  @Post("create")
  async create(@Body() body: MarkerCreateDto, @GetUser() user: RequestUser) {
    return await this.markerService.create(body, user);
  }

  @Get("by-creator-id/:creatorId")
  async getByCreatorId(@Param("creatorId") userId: string) {
    return await this.markerService.getAllByCreatorId(userId);
  }
}
