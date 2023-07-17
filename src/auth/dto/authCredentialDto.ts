import { IsNotEmpty } from "class-validator";
import { rollType } from "../db/user.entity";
export class AuthCredentialDto{
    @IsNotEmpty()
    id : string;

    @IsNotEmpty()
    password : string;

    @IsNotEmpty()
    roll : rollType;

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    phone : string;
}