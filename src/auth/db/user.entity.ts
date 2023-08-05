import { Post } from "src/posts/db/posts.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @OneToMany(type => Post, post => post.user, {eager : true})
    posts : Post[]
}

export enum rollType{
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    USER = 'USER',
}