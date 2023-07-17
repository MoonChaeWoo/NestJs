import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes, ParseIntPipe } from '@nestjs/common';
import { User as UserEntity } from './db/user.entity';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    // -------------------------- CRUD ---------------------------
    // ------------------------- CREATE --------------------------
    @Get('/getSignUp')
    createGetPost(@Query(new ValidationPipe()) AuthCredentialDto : AuthCredentialDto) : Promise<string> {
        return this.authService.createUser(AuthCredentialDto);
    }

    @Post('/postSignUp')
    createPostPost(@Body(new ValidationPipe()) AuthCredentialDto : AuthCredentialDto) : Promise<string> {
        return this.authService.createUser(AuthCredentialDto);
    }
    // -------------------------- READ ---------------------------
    @Get('/getAllUser')
    getAllPost() : Promise<UserEntity[]> {
        return this.authService.getAllUser();
    }

    @Get('/findGetUser')
    readGetQueryPost(@Query('id') id : string) : Promise<UserEntity>{
        return this.authService.getUserById(id);
    }

    @Get('/findGetUser/:id')
    readGetParamPost(@Param('id') id : string) : Promise<UserEntity>{
        return this.authService.getUserById(id);
    }

    @Post('/findPostUser')
    readPostPost(@Body('id') id : string) : Promise<UserEntity>{
        return this.authService.getUserById(id);
    }
    // ------------------------- UPDATE --------------------------
    @Get('/updateGetUser')
    updateGetQueryPost(@Query(new ValidationPipe()) userEntity : UserEntity) : Promise<string>{
        return this.authService.getOneUpdateUser(userEntity);
    }

    @Post('/updatePostUser')
    updatePostBoard(@Body(new ValidationPipe()) userEntity : UserEntity) : Promise<string>{
        return this.authService.getOneUpdateUser(userEntity);
    }

    // ------------------------- DELETE --------------------------
    @Get('/deleteGetUser')
    deleteGetQueryPost(@Query('id') id : string) : Promise<string>{
        return this.authService.getOneDeleteUser(id);
    }

    // 주로 리소스의 식별자나 고유한 값을 전달할 때 사용
    @Get('/deleteGetUser/:id')
    deleteGetParamPost(@Param('id') id : string) : Promise<string>{
        return this.authService.getOneDeleteUser(id);
    }

    @Post('/deletePostUser')
    deletePostPost(@Body('id') id : string) : Promise<string>{
        return this.authService.getOneDeleteUser(id);
    }
    
}
