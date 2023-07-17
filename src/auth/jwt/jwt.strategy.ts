import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../db/user.repository";
import { User } from "../db/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository : UserRepository
    ){
        super({
            secretOrKey : process.env.SECRET,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const { id } = payload;
        const checkUser : User = await this.userRepository.findOneBy({ id });

        if(checkUser){
            return checkUser;
        }else{
            throw new UnauthorizedException('유효하지 못한 토큰입니다');
        }
    }
}