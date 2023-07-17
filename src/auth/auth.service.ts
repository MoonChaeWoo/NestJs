import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './db/user.repository';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User as UserEntity } from './db/user.entity';
import * as bcrypt from 'bcrypt'; // npm install bcrypt
import { AuthLoginDto } from './dto/authLoginDto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository : UserRepository,
        private jwtService : JwtService
    ){}

    // ------------------------- LOGIN ---------------------------
    async loginUser(authLoginDto : AuthLoginDto) : Promise<{accessToken : string}>{
        const findUser = await this.getUserById(authLoginDto.id);
        if(await bcrypt.compare(authLoginDto.password, findUser.password)){
            const payload = { id : authLoginDto.id};
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }else{
            throw new UnauthorizedException('인증에 실패하였습니다');
        } 
    }

    // -------------------------- CRUD ---------------------------
    // ------------------------- CREATE --------------------------
    async createUser(authCredentialDto : AuthCredentialDto) : Promise<string>{

        const saltOrRounds = 10;
        authCredentialDto.password = await bcrypt.hash(authCredentialDto.password, saltOrRounds);

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
