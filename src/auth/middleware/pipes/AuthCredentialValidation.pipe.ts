import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class AuthCredentialValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
    }
}