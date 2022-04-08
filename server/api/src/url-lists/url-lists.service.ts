import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UrlList } from './entities/url-list.entity';
import { CreateUrlListDto } from './dto/create-url-list.dto';
import { DomainsService } from '../domains/domains.service';

@Injectable()
export class UrlListsService {
    constructor(
        @InjectRepository(UrlList)
        private urlListsRepository: Repository<UrlList>,
        private domainsService: DomainsService,
    ) {}

    async create({ listName, domains }: CreateUrlListDto) {
        const urlList = new UrlList();
        urlList.name = listName;

        urlList.domains = await Promise.all(domains.map((domainName) => this.domainsService.get(domainName)));

        return this.urlListsRepository.save(urlList);
    }

    findOne(id: number) {
        return this.urlListsRepository.findOne(id, {
            relations: ['domains', 'domains.contacts'],
        });
    }

    paginate(options: IPaginationOptions): Promise<Pagination<UrlList>> {
        return paginate<UrlList>(this.urlListsRepository, options, {
            relations: ['domains', 'domains.contacts'],
        });
    }
}
