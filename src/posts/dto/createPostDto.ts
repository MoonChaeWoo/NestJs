import { IsNotEmpty } from "class-validator";
import { PostStatus } from "../posts.models";

export class createPostDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    content : string;

    @IsNotEmpty()
    status : PostStatus;
}