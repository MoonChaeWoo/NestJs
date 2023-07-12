import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';

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

    @Get('/insertoard')
    createBoard(@Query(new ValidationPipe()) board : Board) : Board{
        return this.boardsService.createBoard(board);
    }

}
