import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes } from '@nestjs/common';
import { Post as PostEntity } from "./posts.entity";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService : PostsService){}

    // -------------------------- CRUD ---------------------------
    // --------------------- Create GET POST ---------------------

    // ---------------------- Read GET POST -----------------------
        @Get('/getAllPost')
        getAllPost() : Promise<PostEntity[]> {
            return this.postsService.getAllPost();
        }

    // --------------------- Update GET POST ----------------------

    // --------------------- Delete GET POST ----------------------
}
