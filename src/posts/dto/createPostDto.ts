import { IsNotEmpty } from "class-validator";
import { PostStatus } from "../db/posts.models";

export class CreatePostDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    contents : string;

    @IsNotEmpty()
    status : PostStatus;
}