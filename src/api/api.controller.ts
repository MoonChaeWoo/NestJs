import { Controller, Query, ValidationPipe, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { MidTempForcast, MidLandFcst, MidFcst } from './enum/midForcast';
import { ProxyReq, DynamicParam } from './api.service';
import { Cron } from '@nestjs/schedule';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    // 스케쥴러 동적 추가
    @Get('/addCronJob')
    addDynamicCronJob(dynamicParam : DynamicParam) {
        this.apiService.addDynamicCronJob(dynamicParam);
        return `Dynamic Cron Job "${dynamicParam.name}" add successfully.`;
    }

    // 스케쥴러 동적 삭제
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
