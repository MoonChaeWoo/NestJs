import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOptions = [ BoardStatus.PRIVATE, BoardStatus.PUBLIC ];

    transform(value: any, metadata: ArgumentMetadata) {
        if(this.isStatusValid(value.status)){
            throw new BadRequestException(`${value} isn't in the status option`);
        }

        return value;
    }

    private isStatusValid(status : any) : boolean {
        const index = this.StatusOptions.indexOf(status.toUpperCase());
        return index === -1;
    }
}