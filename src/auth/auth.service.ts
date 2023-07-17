import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './db/user.repository';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User as UserEntity } from './db/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository : UserRepository
    ){}

    // -------------------------- CRUD ---------------------------
    // ------------------------- CREATE --------------------------
    async createUser(authCredentialDto : AuthCredentialDto) : Promise<string>{
        const createUser = this.userRepository.create(authCredentialDto);

        try{
            await this.userRepository.save(createUser);
        }catch(e){
            if(e.code === '23505'){
                throw new BadRequestException(`ID가 중복되었습니다`);
            }else{
                throw new BadRequestException(`잘못된 요청입니다`);
            }
        }

        return '회원가입이 완료되었습니다.';
    }
    // -------------------------- READ ---------------------------
    async getAllUser() : Promise<UserEntity[]>{
        return await this.userRepository.find();
    }

    async getUserById(id : string) : Promise<UserEntity>{
        const findUser = await this.userRepository.findOneBy({id : id});

        if(!findUser){
            throw new NotFoundException(`해당 가입자는 없습니다 (${id})`);
        }
        return findUser;
    }
    // ------------------------- UPDATE --------------------------
    async getOneUpdateUser(userEntity : UserEntity) : Promise<string>{
        const findUser = await this.getUserById(userEntity.id);
        const updateObject = Object.assign(findUser, userEntity);
        const result = await this.userRepository.update(userEntity.uid, updateObject);

        if(result.affected <= 0){
            throw new ConflictException('회원정보 수정이 이루어지지 않았습니다');
        }
        return '회원정보 수정이 완료되었습니다';
    }

    // ------------------------- DELETE --------------------------
    async getOneDeleteUser(id : string) : Promise<string>{
        const result = await this.userRepository.delete(id);
        if(result.affected <= 0){
            throw new NotFoundException(`회원 탈퇴할 가입자는 없습니다 (${id})`);
        }
        return '탈퇴가 완료되었습니다';
    }
}
