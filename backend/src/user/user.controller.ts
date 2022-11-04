import { Controller, Get, Param, UseGuards } from "@nestjs/common";

import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user: any) {
    console.log(user);
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
}
