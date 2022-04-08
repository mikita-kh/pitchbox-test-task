import { IsNotEmpty, IsFQDN } from 'class-validator';

export class CreateUrlListDto {
    @IsNotEmpty()
    listName: string;

    @IsFQDN({}, { each: true })
    domains: string[];
}
