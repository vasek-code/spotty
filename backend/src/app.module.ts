import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MarkerModule } from "./marker/marker.module";
import { CommentModule } from "./comment/comment.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MarkerModule,
    CommentModule,
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
