import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity} from './db/posts.entity';
import { PostRepository } from './db/posts.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([PostEntity]),
    AuthModule
  ],
  controllers: [PostsController],
  providers: [
    PostRepository,
    PostsService
  ]
})
export class PostsModule {}
