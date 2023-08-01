import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TemperatureRepository } from './scheduler/forecast/mid_term/db/temperatures.repository';

@Module({
  controllers: [ApiController],
  providers: [ TemperatureRepository, ApiService]
})
export class ApiModule {}
