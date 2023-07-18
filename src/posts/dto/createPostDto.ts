import { IsNotEmpty } from "class-validator";
import { PostStatus } from "../db/posts.models";
import { User } from "src/auth/db/user.entity";

export class CreatePostDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    contents : string;

    @IsNotEmpty()
    status : PostStatus;
}