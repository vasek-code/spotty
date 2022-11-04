import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MarkerModule } from "./marker/marker.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MarkerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
