import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes } from '@nestjs/common';
import { PostRepository } from './posts.repository';
import { Post as PostEntity } from "./posts.entity";

@Controller('posts')
export class PostsController {

    constructor(private readonly postRepository : PostRepository){}

    // -------------------------- CRUD ---------------------------
    // --------------------- Create GET POST ---------------------

    // ---------------------- Read GET POST -----------------------
        @Get('/getAllPost')
        getAllPost() : Promise<PostEntity[]> {
            return this.postRepository.getAllPost();
        }

    // --------------------- Update GET POST ----------------------

    // --------------------- Delete GET POST ----------------------
}
