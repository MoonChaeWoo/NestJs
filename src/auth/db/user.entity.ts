import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    uid : number;

    @Column()
    id : string;

    @Column()
    password : string;

    @Column()
    roll : rollType;

    @Column()
    email : string;

    @Column()
    phone : string;
}

export enum rollType{
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    USERR = 'USER',
}