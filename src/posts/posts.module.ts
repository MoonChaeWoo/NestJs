import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity} from './db/posts.entity';
import { PostRepository } from './db/posts.repository';

@Module({
  imports : [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [
    PostRepository,
    PostsService
  ]
})
export class PostsModule {}
