import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import axios from 'axios';
import { ProxyReq } from './api.controller';

interface DynamicObject {
    [key: string]: unknown;
}

@Injectable()
export class ApiService {
    
    constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

    private readonly logger = new Logger(ApiService.name);

    addDynamicCronJob(name: string, cronTime: string) {
        const job = new CronJob(cronTime, () => {
        this.logger.debug(`Dynamic Cron Job "${name}" is running.`);
        });

        // SchedulerRegistry를 통해 크론 작업을 동적으로 추가
        this.schedulerRegistry.addCronJob(name, job);

        // 크론 작업을 시작합니다.
        job.start();
    }

    removeDynamicCronJob(name: string) {
        // SchedulerRegistry를 통해 등록된 크론 작업을 동적으로 제거
        this.schedulerRegistry.deleteCronJob(name);
    }

    // 기상청 중기기온조회 & 중기육상정보조회
    async ReqMidFcstInfoService(endPoint : string, regId : string) : Promise<JSON | null | string>{
        const searchDate = new Intl.DateTimeFormat("ko", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date()).replaceAll(/(\.|\s)/g, '').concat('0600');

        const awiatReq = await axios.get('https://apis.data.go.kr/1360000/MidFcstInfoService/'.concat(endPoint),{
            params : {
                serviceKey : process.env.API_SERVICE_KEY,
                pageNo : 1,
                numberOfRows : 10,
                dataType : 'JSON',
                regId,
                tmFc : searchDate
            }
        }).then(function(response){
            return JSON.stringify(response.data);
        }).catch(function(error){
            return error.toString();
        });
        return awiatReq;
    }

    // Proxy
    async ProxyReq(proxyReq : ProxyReq) : Promise<any>{
        const {url,method,data} = proxyReq;
        if(method.toLocaleLowerCase() === 'post'){
            return await axios({url,method,data}).then(function(response){return response.data;});
        }else if(method.toLocaleLowerCase() === 'get'){
            return await axios({url,method, params: data}).then(function(response){return response.data;});
        }else{
            return '다른 방식에 대한 요청은 관리자에게 요청';
        }
    }
}
