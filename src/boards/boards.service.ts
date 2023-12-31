import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreatBoardDto } from './dto/createBoardDto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    // ------------------- Create ---------------------
    createBoard(creatBoardDto : CreatBoardDto) : Board{
        const board : Board = { id : uuid(), ...creatBoardDto};
        this.boards.push(board);
        return board;
    }

    // -------------------- Read ----------------------
    getAllReadBoard() : Board[]{
        return this.boards;
    }

    getOneReadBoard(id : string) : Board{
        const findItem : Board = this.boards.find(v => v.id === id);
        if(!findItem) throw new NotFoundException();
        // if(!findItem) throw new NotFoundException('원하는 문구 넣어도됨');
        return findItem;
    }

    // -------------------- Update ---------------------
    getOneUpdateBoard(board : Board) : Board[]{
        const mapBoard : Board[] = this.boards.map(v => v.id === board.id ? ({v, ...board}) : v);
        this.boards = mapBoard;
        return this.boards;
    }

    // -------------------- Delete ---------------------
    getOneDeleteBoard(id : string) : Board[]{
        const board : Board = this.getOneReadBoard(id);
        const filterBoard : Board[] = this.boards.filter(v => v.id !== board.id);
        this.boards = filterBoard;
        return this.boards;
    }
}
