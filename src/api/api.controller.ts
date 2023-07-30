import { Controller, Query, ValidationPipe, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { MidTempForcast, MidLandFcst, MidFcst } from './enum/midForcast';
import { Cron } from '@nestjs/schedule';

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

    @Get('/addCronJob')
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

    // 기상청 중기기온조회
    @Get('/getMidTempForcast')
    //@Cron('* 5 6 * * *', { name: 'getMidTempForcast' })
    ReqMidTempForcast(){
        return this.apiService.ReqMidFcstInfoService('getMidTa', MidTempForcast.GWANGJU);
    }
    
    // 기상청 중기육상정보조회
    @Get('/getMidLandFcst')
    //@Cron('* 5 6 * * *', { name: 'getMidLandFcst' })
    ReqMidLandFcst(){
        return this.apiService.ReqMidFcstInfoService('getMidLandFcst', MidLandFcst.JEOLLANAMDO);
    }

    // 기상청 중기전망조회
    @Get('/getMidFcst')
    //@Cron('* 5 6 * * *', { name: 'getMidFcst' })
    ReqMidFcst(){
        return this.apiService.ReqMidFcstInfoService('getMidFcst', MidFcst.JEOLLANAMDO);
    }
    
    // Proxy 요청
    @Get('/Proxy')
    async ProxyReq(@Query() proxyReq : ProxyReq){
        return await this.apiService.ProxyReq(proxyReq);
    }
}
