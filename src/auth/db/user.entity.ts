import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    uid : number;

    @Column({ unique: true })
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