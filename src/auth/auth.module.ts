import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './db/user.entity';
import { JwtModule } from '@nestjs/jwt'; // // npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserRepository } from './db/user.repository';

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : process.env.SECRET,
      signOptions : {expiresIn : '60s'}
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, JwtStrategy],
  exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}
