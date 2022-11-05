import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Marker } from "@prisma/client";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
export class MarkerGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent("marker.create", { async: true })
  async handleCreateMarkerEvent(payload: Marker) {
    this.server.emit("marker.create", payload);
  }
}
