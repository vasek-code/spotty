import { Module } from "@nestjs/common";

import { MarkerController } from "./marker.controller";
import { MarkerGateway } from "./marker.gateway";
import { MarkerService } from "./marker.service";

@Module({
  imports: [],
  controllers: [MarkerController],
  providers: [MarkerService, MarkerGateway],
})
export class MarkerModule {}
