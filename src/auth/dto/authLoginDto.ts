import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthLoginDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    id : string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    password : string;
}