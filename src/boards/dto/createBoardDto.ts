import { IsNotEmpty } from "class-validator";

export class CreatBoardDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;

    @IsNotEmpty()
    status : BoardStatus;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}