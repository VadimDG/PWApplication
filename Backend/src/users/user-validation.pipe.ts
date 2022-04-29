import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UserNameValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(value.Name)) {
            throw new HttpException('User name is not human readable', HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}