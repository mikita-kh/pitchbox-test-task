import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HunterIoService } from '../hunter-io/hunter-io.service';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';

@Injectable()
export class DomainsService {
    constructor(
        @InjectRepository(Domain)
        private domainsRepository: Repository<Domain>,
        @InjectRepository(DomainContact)
        private domainContactsRepository: Repository<DomainContact>,
        private hunterIoService: HunterIoService,
    ) {}

    async get(domainName: string): Promise<Domain> {
        let domain = await this.domainsRepository.findOne({ domainName }, { relations: ['contacts'] });

        if (!domain) {
            domain = new Domain();
            domain.domainName = domainName;
            domain.contacts = await Promise.all(
                (
                    await this.hunterIoService.domainSearch(domainName)
                ).map(
                    ({ value, first_name, last_name, confidence }) =>
                        new Promise<DomainContact>((resolve, reject) => {
                            const dc = new DomainContact();
                            dc.email = value;
                            dc.firstName = first_name;
                            dc.lastName = last_name;
                            dc.confidence = confidence;

                            this.domainContactsRepository.save(dc).then(() => resolve(dc), reject);
                        }),
                ),
            );
        }

        return domain;
    }
}
