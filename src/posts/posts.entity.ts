import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostStatus } from "./posts.models";

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    contents : string;

    @Column()
    status : PostStatus;
}