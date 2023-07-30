import { Controller, Post, Body, Query, ValidationPipe, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get('/')
    addDynamicCronJob() {
        const {name, cronTime} = {name : 'test', cronTime : '* * * * * *'}
        this.apiService.addDynamicCronJob(name, cronTime);
        return `Dynamic Cron Job "${name}" added successfully.`;
    }

    @Get('/stopCronJob')
    removeDynamicCronJob(@Query('name', ValidationPipe) name : string) {
        this.apiService.removeDynamicCronJob(name);
        return `Dynamic Cron Job "${name}" removed successfully.`;
      }
    
}
