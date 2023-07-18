import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostStatus } from "./posts.models";
import { User } from "src/auth/db/user.entity";

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    uid : number;

    @Column()
    title : string;

    @Column()
    contents : string;

    @Column()
    status : PostStatus;

    @ManyToOne(type => User, user => user.posts, { eager : false })
    user : User;
}