import { IsNotEmpty } from "class-validator";
import { BoardStatus } from "../boards.model";

export class CreatBoardDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;

    @IsNotEmpty()
    status : BoardStatus;
}