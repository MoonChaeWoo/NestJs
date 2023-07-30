import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Temperature } from "./temperatures.entity";

@Injectable()
export class PostRepository extends Repository<Temperature>{
    constructor(dataSource : DataSource){
        super(Temperature, dataSource.createEntityManager());
    }
}