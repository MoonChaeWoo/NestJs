import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';
import { join } from 'path';

export const typeormConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : process.env.DB_HOST,
    port : parseInt(process.env.DB_PORT),
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    entities : [join(__dirname, process.env.ENTITY_PATH)],
    synchronize : true,
    logging : true
}

// 엔티티를 이용해서 데이터베이스 테이블을 생성함.
// 엔티티 파일이 어디에 있는지 설정을 해준다.
// typeorm-model-generator
// 




