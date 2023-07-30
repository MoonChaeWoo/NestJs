import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
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

    // @Cron('* * * * * *', { name: 'cronTask1' })
    // handleCron() {
    //     this.logger.debug('Called111 when the current second is *');
    // }

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

    // 주간 예보 
    async ReqMidTempForcast() : Promise<JSON | null | string>{
        const awiatReq = await axios.get('https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa',{
            params : {
                serviceKey : process.env.API_SERVICE_KEY,
                pageNo : 1,
                numberOfRows : 10,
                dataType : 'JSON',
                regId : '11B10101',
                tmFc : '202307300600'
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
