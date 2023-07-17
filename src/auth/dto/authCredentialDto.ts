import { IsNotEmpty, IsString, MaxLength, MinLength, Matches } from "class-validator";
import { rollType } from "../db/user.entity";
export class AuthCredentialDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    id : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(20)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,20}$/,{
        message : '영문 숫자 특수기호 조합 최소 9자리 이상 최대 20자리 이하를 입력하세요'
    })
    password : string;

    @IsNotEmpty()
    roll : rollType;

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    phone : string;
}