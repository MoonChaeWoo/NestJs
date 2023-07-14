import { Controller, Get, Query, ValidationPipe, Post, Body, Param, UsePipes } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreatBoardDto } from './dto/createBoardDto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService:BoardsService){}

    // @Body(), @Query(), @Param() = 파라미터를 비워두면 모두 가져온다는 의미.
    // @Query('id') id : string = key가 id에 대한 것만 가져온다는 의미. 나머지 데코레이터도 동일.
    // -------------------------- CRUD ---------------------------
    // --------------------- Create GET POST ---------------------
    @Get('/insertGetBoard')
    createGetBoard(@Query(new ValidationPipe()) board : CreatBoardDto) : Board{
        return this.boardsService.createBoard(board);
    }

    @Post('/insertPostBoard')
    @UsePipes(ValidationPipe)
    createPostBoard(@Body() board : CreatBoardDto) : Board{
        return this.boardsService.createBoard(board);
    }

    // ---------------------- Read GET POST -----------------------
    @Get('/getAllBoard')
    getAllReadBoard() : Board[]{
        return this.boardsService.getAllReadBoard();
    }

    // key=value 형식으로 여러 개의 매개변수를 전달
    // 쿼리 매개변수는 주로 필터링, 페이징, 정렬 등의 검색 조건을 전달할 때 사용
    @Get('/readGetBoard')
    readGetQueryBoard(@Query('id') id : string) : Board{
        return this.boardsService.getOneReadBoard(id);
    }

    // 주로 리소스의 식별자나 고유한 값을 전달할 때 사용
    @Get('/readGetBoard/:id')
    readGetParamBoard(@Param('id') id : string) : Board{
        return this.boardsService.getOneReadBoard(id);
    }

    @Post('/readPostBoard')
    readPostBoard(@Body('id') id : string) : Board{
        return this.boardsService.getOneReadBoard(id);
    }

    // ---------------------- Update GET POST -----------------------
    // key=value 형식으로 여러 개의 매개변수를 전달
    // 쿼리 매개변수는 주로 필터링, 페이징, 정렬 등의 검색 조건을 전달할 때 사용
    @Get('/updateGetBoard')
    updateGetQueryBoard(@Query() board : Board) : Board[]{
        return this.boardsService.getOneUpdateBoard(board);
    }

    @Post('/updatePostBoard')
    updatePostBoard(@Body(BoardStatusValidationPipe) board : Board) : Board[]{
        return this.boardsService.getOneUpdateBoard(board);
    }

    // ---------------------- Delete GET POST -----------------------
    // key=value 형식으로 여러 개의 매개변수를 전달
    // 쿼리 매개변수는 주로 필터링, 페이징, 정렬 등의 검색 조건을 전달할 때 사용
    @Get('/deleteGetBoard')
    deleteGetQueryBoard(@Query('id') id : string) : Board[]{
        return this.boardsService.getOneDeleteBoard(id);
    }

    // 주로 리소스의 식별자나 고유한 값을 전달할 때 사용
    @Get('/deleteGetBoard/:id')
    deleteGetParamBoard(@Param('id') id : string) : Board[]{
        return this.boardsService.getOneDeleteBoard(id);
    }

    @Post('/deletePostBoard')
    deletePostBoard(@Body('id') id : string) : Board[]{
        return this.boardsService.getOneDeleteBoard(id);
    }
}
// 설치해야할 npm 모듈 목록 
// -> npm list

// 유효성 파이프 모듈 설치와 참고 사이트
// -> npm install class-validator class-transformer --save
// -> https://github.com/typestack/class-validator#manual-validation