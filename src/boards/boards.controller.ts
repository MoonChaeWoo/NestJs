import { Controller, Get, Query, ValidationPipe, Post, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreatBoardDto } from './dto/createBoardDto';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService:BoardsService){}

    @Get('/test')
    GetAllTask() : string{
        return this.boardsService.testMethod();
    }

    @Get('/getAllBoard')
    getAllBoard() : Board[]{
        return this.boardsService.getAllBoard();
    }

    @Get('/insertGetBoard')
    createGetBoard(@Query(new ValidationPipe()) board : CreatBoardDto) : Board{
        return this.boardsService.createBoard(board);
    }

    @Post('/insertPostBoard')
    createPostBoard(@Body() board : CreatBoardDto) : Board{
        return this.boardsService.createBoard(board);
    }

}
