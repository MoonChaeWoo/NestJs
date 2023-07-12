import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 31115,
    username : 'postgres',
    password : '1q2w3e4r!',
    database : 'CW-Practice',
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : true
}
// 엔티티를 이용해서 데이터베이스 테이블을 생성함.
// 엔티티 파일이 어디에 있는지 설정을 해준다.