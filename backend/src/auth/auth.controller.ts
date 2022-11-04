import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Post("signin")
  async signin(@Body() body: SigninDto) {
    return await this.authService.signin(body);
  }
}
