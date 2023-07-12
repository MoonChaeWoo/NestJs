import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import {v1 as uuid} from 'uuid';
import { CreatBoardDto } from './dto/createBoardDto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    getAllBoard() : Board[]{
        return this.boards;
    }

    createBoard(creatBoardDto : CreatBoardDto) : Board{
        const board : Board = { id : uuid(), ...creatBoardDto};
        this.boards.push(board);
        return board;
    }

    testMethod() : string{
        return 'boardtest';
    }
}
