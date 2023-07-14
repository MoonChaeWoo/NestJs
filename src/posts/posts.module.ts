import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostRepository } from './posts.repository';

@Module({
  imports : [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [
    PostRepository,
    PostsService
  ]
})
export class PostsModule {}
