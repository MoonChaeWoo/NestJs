import { Controller, Post, Body, Query, Res, ValidationPipe, Get } from '@nestjs/common';
import { ApiService } from './api.service';

interface DynamicObject {
    [key: string]: unknown;
}

export interface ProxyReq{
    url : string;
    method : string;
    data : DynamicObject;
}

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

    @Get('/MidFcstInfoService')
    ReqMidTempForcast(){
        return this.apiService.ReqMidTempForcast();
    }
    
    @Get('/Proxy')
    async ProxyReq(@Query() proxyReq : ProxyReq){
        return await this.apiService.ProxyReq(proxyReq);
    }
}
