import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class ApiService {
    
    constructor(private readonly schedulerRegistry: SchedulerRegistry) {}


    private readonly logger = new Logger(ApiService.name);

    @Cron('* * * * * *', { name: 'cronTask1' })
    handleCron() {
        this.logger.debug('Called111 when the current second is *');
    }

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
}
