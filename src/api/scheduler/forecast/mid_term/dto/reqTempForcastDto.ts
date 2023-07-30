import { IsNotEmpty } from "class-validator";

export class ReqMidTempForcastDto{
    @IsNotEmpty()
    serviceKey : string;

    @IsNotEmpty()
    pageNo : number; // ex : 1

    @IsNotEmpty()
    numOfRows : number; // ex : 10

    @IsNotEmpty()
    dataType : string; // ex : JSON, XML

    @IsNotEmpty()
    regId : string; // ex : 11B00000
    
    @IsNotEmpty()
    tmFc : string; // ex : 202301010600
}