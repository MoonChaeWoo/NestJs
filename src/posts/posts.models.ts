export interface Post{
    id : number;
    title : string;
    contents : string;
    status : PostStatus; 
}

export enum PostStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}