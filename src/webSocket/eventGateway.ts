import {
    ConnectedSocket,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    MessageBody
  } from '@nestjs/websockets';
  import { Server } from 'ws';
  import { Logger } from "@nestjs/common";
import { Socket } from 'socket.io';

@WebSocketGateway(3002)
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger("EventGateway");

    afterInit () {
        this.logger.log(`webSocket port =====> 3002`);
    }

    // 소켓이 연결되면 실행
    handleConnection() {
        this.logger.log(`Socket Connect Success`);
    }

    // 소켓 연결이 끊기면 실행
    handleDisconnect() {
        this.logger.log(`Socket Disconnect Success`);
    }

    // @SubscribeMessage(이름) : event라는 유형의 message를 받게되면 onEvent 함수를 작동.
    // @ConnectedSocket은 연결된 소켓 인스턴스를 반환하며, @MessageBody는 브라우저 측에서 보낸 데이터를 반환합니다.
    // broadcast는 데이터를 보낸 socket을 제외하고, 모든 socket들에게 이벤트를 보내는 것
    // return 을 통해 응답
    // @MessageBody() == client: Socket, data: string 같은 의미

    // 1 대 1 통신을 할 때 이용
    @SubscribeMessage('reqMsg')
    handleEvent(@MessageBody() data: string){
        this.server.emit('resMsg', { data });
    }

    // 연결되어있는 모든 소켓에 대하여 소켓 데이터 전송 시 이용
    @SubscribeMessage('broadcastMsg')
    broadcastMsg(@ConnectedSocket() socket: Socket, @MessageBody() data: string){
        socket.broadcast.emit('broadcastResMsg', { data });
    }
}
// socket.emit('이벤트 이름', '서버에게 보낼 데이터 내용');
// emit()메서드를 통해 서버에게 "데이터"를 보낼 수 있다.
// 서버에서는 "이벤트이름"으로 데이터를 받아 처리할 수 있다.