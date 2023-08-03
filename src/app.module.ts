import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeormConfig } from './configs/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventGateway } from './webSocket/eventGateway';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRoot(typeormConfig),
    ScheduleModule.forRoot(),
    BoardsModule,
    PostsModule,
    AuthModule,
    ApiModule],
  controllers: [AppController],
  providers: [EventGateway, AppService],
})
export class AppModule {}

// cross-env 는 MACOS Linux window 에서 모두 돌아가게 하기 위함
// NODE_ENV는 process.env.NODE_ENV 를 사용하기위한 변수