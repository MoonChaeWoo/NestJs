import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { Post as PostEntity } from "./posts.entity";
import { CreatePostDto } from './dto/createPostDto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository : PostRepository
    ){}

    // -------------------------- CRUD ---------------------------
    // ------------------------- CREATE --------------------------
    async createPost(creatPostDto : CreatePostDto) : Promise<string> {
        const createPost = this.postRepository.create(creatPostDto);

        const result = await this.postRepository.save(createPost);
        if(!result){
            throw new BadRequestException(`잘못된 요청입니다`);
        };
        return '저장이 완료되었습니다';
    }

    // -------------------------- READ ---------------------------
    async getAllPost() : Promise<PostEntity[]>{
        return await this.postRepository.find();
    }

    async getPostById(id : number) : Promise<PostEntity>{
        const findItem = await this.postRepository.findOneBy({id : id});

        if(!findItem){
            throw new NotFoundException(`해당 게시글은 없습니다 (${id})`);
        }
        return findItem;
    }

    // ------------------------- UPDATE ---------------------------
    async getOneUpdatePost(postEntity : PostEntity) : Promise<string>{
        const findItem = this.getPostById(postEntity.id);
        const updateObject = Object.assign(findItem, postEntity);
        
        const result = await this.postRepository.update(postEntity.id, updateObject);

        if(result.affected <= 0){
            throw new ConflictException('업데이트에 충돌이 생겼습니다');
        }
        return '수정이 완료되었습니다';
    }

    // ------------------------- DELETE ---------------------------
    async getOneDeletePost(id : number) : Promise<string>{
        const result = await this.postRepository.delete(id);
        if(result.affected <= 0){
            throw new NotFoundException(`삭제할 해당 게시글은 없습니다 (${id})`);
        }
        return '삭제가 완료되었습니다';
    }
}
