import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    testMethod() : string{
        return 'boardtest';
    }
}
