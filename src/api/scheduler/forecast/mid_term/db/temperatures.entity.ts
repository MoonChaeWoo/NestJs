import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Temperature extends BaseEntity{

    @PrimaryColumn()
    forecastDate : string; // 예보 날짜

    @Column()
    taMin : string; // 최저 기온 예보

    @Column()
    taMax : string; // 최고 기온 예보

    @Column()
    wfAm : string; // 오전 날씨 예보

    @Column()
    wfPm : string; // 오후 날씨 예보
}