import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { TemperatureRepository } from './scheduler/forecast/mid_term/db/temperatures.repository';
import axios from 'axios';

export interface DynamicObject {
    [key: string]: unknown;
}

export interface ProxyReq{
    url : string;
    method : string;
    data : DynamicObject;
}

export interface DynamicParam extends ProxyReq{
    name : string;
    cronTime: string;
}

@Injectable()
export class ApiService {
    constructor(private readonly schedulerRegistry: SchedulerRegistry,
        private readonly temperatureRepository : TemperatureRepository) {}

    private readonly logger = new Logger(ApiService.name);

    // 크론 동적 추가
    addDynamicCronJob(dynamicParam : DynamicParam) {
        const {url, method, data, name, cronTime} = dynamicParam;
        const job = new CronJob(cronTime, () => {
            this.ProxyReq({url, method, data})
        });

        // SchedulerRegistry를 통해 크론 작업을 동적으로 추가
        this.schedulerRegistry.addCronJob(name, job);

        // 크론 작업을 시작
        job.start();
    }

    // 크론 동적 삭제
    removeDynamicCronJob(name: string) {
        // SchedulerRegistry를 통해 등록된 크론 작업을 동적으로 제거
        this.schedulerRegistry.deleteCronJob(name);
    }

    // 기상청 중기기온조회 & 중기육상정보조회 & 중기전망조회
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
            return await axios({url,method,data}).then(function(response){return response.data});
        }else if(method.toLocaleLowerCase() === 'get'){
            return await axios({url,method, params: data}).then(function(response){return response.data});
        }else{
            return '다른 방식에 대한 요청은 관리자에게 요청';
        }
    }
}
