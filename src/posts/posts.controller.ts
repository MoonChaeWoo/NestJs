import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Post as PostEntity } from "./db/posts.entity";
import { PostsService } from "./posts.service";
import { CreatePostDto } from './dto/createPostDto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGetUser } from 'src/auth/middleware/decorator/auth-decorator';
import { User } from 'src/auth/db/user.entity';
import { PostRepository } from './db/posts.repository';

@Controller('posts')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard())
export class PostsController {

    constructor(private readonly postsService : PostsService){}

    // -------------------------- CRUD ---------------------------
    // --------------------- Create GET POST ---------------------
    @Get('/insertGetPost')
    createGetPost(@Query() createPostDto : CreatePostDto,
    @AuthGetUser() user : User) : Promise<string> {
        return this.postsService.createPost(createPostDto, user);
    }

    @Post('/insertPostPost')
    createPostPost(@Body() createPostDto : CreatePostDto,
    @AuthGetUser() user : User) : Promise<string> {
        return this.postsService.createPost(createPostDto, user);
    }

    // ---------------------- Read GET POST -----------------------
    @Get('/getAllPost')
    getAllPost() : Promise<PostEntity[]> {
        return this.postsService.getAllPost();
    }

    @Get('/readGetPost')
    readGetQueryPost(@Query('uid', ParseIntPipe) uid : number) : Promise<PostEntity>{
        return this.postsService.getPostById(uid);
    }

    @Get('/readGetPost/:uid')
    readGetParamPost(@Param('uid', ParseIntPipe) uid : number) : Promise<PostEntity>{
        return this.postsService.getPostById(uid);
    }

    @Post('/readPostBoard')
    readPostPost(@Body('uid', ParseIntPipe) uid : number) : Promise<PostEntity>{
        return this.postsService.getPostById(uid);
    }

    // -------------------- 해당 유저의 글만 보는 기능 ----------------------
    @Get('/getPostsByCurrentUser')
    getGetPostsByCurrentUser(@AuthGetUser() user : User) : Promise<PostEntity[]>{
        return this.postsService.getPostsByCurrentUser(user);
    }

    @Post('/getPostsByCurrentUser')
    getPostPostsByCurrentUser(@AuthGetUser() user : User) : Promise<PostEntity[]>{
        return this.postsService.getPostsByCurrentUser(user);
    }

    // --------------------- Update GET POST ----------------------
    @Get('/updateGetPost')
    updateGetQueryPost(@Query() postEntity : PostEntity) : Promise<string>{
        return this.postsService.getOneUpdatePost(postEntity);
    }

    @Post('/updatePostPost')
    updatePostPost(@Body() postEntity : PostEntity) : Promise<string>{
        return this.postsService.getOneUpdatePost(postEntity);
    }

    // --------------------- Delete GET POST ----------------------
    // remove() : 무조건 존재하는 아이템을 지워야함. 없을 시 오류 발생
    // delete() : 아이템이 존재하지 않아도 오류를 발생하지않음.
    @Get('/deleteGetPost')
    deleteGetQueryPost(@Query('uid', ParseIntPipe) uid : number) : Promise<string>{
        return this.postsService.getOneDeletePost(uid);
    }

    // 주로 리소스의 식별자나 고유한 값을 전달할 때 사용
    @Get('/deleteGetPost/:uid')
    deleteGetParamPost(@Param('uid', ParseIntPipe) uid : number) : Promise<string>{
        return this.postsService.getOneDeletePost(uid);
    }

    @Post('/deletePostPost')
    deletePostPost(@Body('uid', ParseIntPipe) uid : number) : Promise<string>{
        return this.postsService.getOneDeletePost(uid);
    }

    //  ------------------------- 해당 유저의 글 삭제 -------------------
    @Get('/deleteGetPostByCurrentUser')
    deleteGetPostsByCurrentUser(@Query('uid', ParseIntPipe) uid : number, @AuthGetUser() user : User) : Promise<string>{
        return this.postsService.getDeletePostsByCurrentUser(uid, user);
    }

    @Post('/deletePostPostByCurrentUser')
    deletePostPostsByCurrentUser(@Body('uid', ParseIntPipe) uid : number, @AuthGetUser() user : User) : Promise<string>{
        return this.postsService.getDeletePostsByCurrentUser(uid, user);
    }
}
