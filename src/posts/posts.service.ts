import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { Post } from "./posts.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository : PostRepository
    ){}

    // // -------------------------- CRUD ---------------------------
    // // -------------------------- READ ---------------------------
    async getAllPost() : Promise<Post[]>{
        return await this.postRepository.find();
    }

    // async getPostById(id : number) : Promise<Post>{
    //     return await this.findOneBy({id : id});
    // }
}
