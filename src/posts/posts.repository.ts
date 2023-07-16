import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Post } from "./posts.entity";

@Injectable()
export class PostRepository extends Repository<Post>{
    constructor(dataSource : DataSource){
        super(Post, dataSource.createEntityManager());
    }
}