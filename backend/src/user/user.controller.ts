import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";

import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import { Response } from "express";
import { RequestUser } from "src/auth/strategy";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user: RequestUser) {
    return user;
  }

  @Get("by-id/:userId")
  async getOneById(@Param("userId") userId: string) {
    return await this.userService.getOneById(userId);
  }

  @Get("best-finders")
  async getBestFinders() {
    return await this.userService.getBestFinders();
  }

  @Get("remove-token")
  async removeToken(@Res() response: Response) {
    response.setHeader("set-cookie", "spotty_auth=; path=/;");
    return;
  }
}
