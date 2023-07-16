import { Controller } from '@nestjs/common';
import { UserRepository } from './db/user.repository';

@Controller('auth')
export class AuthController {
    constructor(private readonly userRepository : UserRepository){}

    
}
