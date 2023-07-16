import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './db/user.entity';
import { UserRepository } from './db/user.repository';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService]
})
export class AuthModule {}
