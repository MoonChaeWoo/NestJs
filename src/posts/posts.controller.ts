import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes, ParseIntPipe } from '@nestjs/common';
import { Post as PostEntity } from "./db/posts.entity";
import { PostsService } from "./posts.service";
import { CreatePostDto } from './dto/createPostDto';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService : PostsService){}

    // -------------------------- CRUD ---------------------------
    // --------------------- Create GET POST ---------------------
    @Get('/insertGetPost')
    createGetPost(@Query(new ValidationPipe()) createPostDto : CreatePostDto) : Promise<string> {
        return this.postsService.createPost(createPostDto);
    }

    @Post('/insertPostPost')
    createPostPost(@Body(new ValidationPipe()) createPostDto : CreatePostDto) : Promise<string> {
        return this.postsService.createPost(createPostDto);
    }

    // ---------------------- Read GET POST -----------------------
    @Get('/getAllPost')
    getAllPost() : Promise<PostEntity[]> {
        return this.postsService.getAllPost();
    }

    @Get('/readGetPost')
    readGetQueryPost(@Query('id', ParseIntPipe) id : number) : Promise<PostEntity>{
        return this.postsService.getPostById(id);
    }

    @Get('/readGetPost/:id')
    readGetParamPost(@Param('id', ParseIntPipe) id : number) : Promise<PostEntity>{
        return this.postsService.getPostById(id);
    }

    @Post('/readPostBoard')
    readPostPost(@Body('id', ParseIntPipe) id : number) : Promise<PostEntity>{
        return this.postsService.getPostById(id);
    }
    // --------------------- Update GET POST ----------------------
    @Get('/updateGetBoard')
    updateGetQueryPost(@Query(new ValidationPipe()) postEntity : PostEntity) : Promise<string>{
        return this.postsService.getOneUpdatePost(postEntity);
    }

    @Post('/updatePostBoard')
    updatePostBoard(@Body(new ValidationPipe()) postEntity : PostEntity) : Promise<string>{
        return this.postsService.getOneUpdatePost(postEntity);
    }

    // --------------------- Delete GET POST ----------------------
    // remove() : 무조건 존재하는 아이템을 지워야함. 없을 시 오류 발생
    // delete() : 아이템이 존재하지 않아도 오류를 발생하지않음.
    @Get('/deleteGetPost')
    deleteGetQueryPost(@Query('id', ParseIntPipe) id : number) : Promise<string>{
        return this.postsService.getOneDeletePost(id);
    }

    // 주로 리소스의 식별자나 고유한 값을 전달할 때 사용
    @Get('/deleteGetPost/:id')
    deleteGetParamPost(@Param('id', ParseIntPipe) id : number) : Promise<string>{
        return this.postsService.getOneDeletePost(id);
    }

    @Post('/deletePostPost')
    deletePostPost(@Body('id', ParseIntPipe) id : number) : Promise<string>{
        return this.postsService.getOneDeletePost(id);
    }
}
