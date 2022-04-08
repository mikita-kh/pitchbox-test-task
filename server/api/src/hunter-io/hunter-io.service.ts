import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

interface HunterResponse {
    domain: string;
    emails: Array<{
        value: string;
        confidence: number;
        first_name: string;
        last_name: string;
    }>;
}

@Injectable()
export class HunterIoService {
    constructor(private configService: ConfigService, private httpService: HttpService) {}

    async domainSearch(domain: string) {
        const { data } = await this.httpService
            .get<{ data: HunterResponse }>('https://api.hunter.io/v2/domain-search', {
                params: {
                    domain,
                    api_key: this.configService.get<string>('HUNTER_IO_API_KEY'),
                },
            })
            .toPromise();

        return data.data?.emails ?? [];
    }
}
