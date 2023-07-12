import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import {v1 as uuid} from 'uuid';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    getAllBoard() : Board[]{
        return this.boards;
    }

    createBoard(board : Board) : Board{
        board.id = uuid();
        this.boards.push(board);
        return board;
    }

    testMethod() : string{
        return 'boardtest';
    }
}
