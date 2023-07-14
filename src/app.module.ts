import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeormConfig } from './configs/typeorm.config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    BoardsModule,
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
