import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainsService } from './domains.service';
import { HunterIoModule } from '../hunter-io/hunter-io.module';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';

@Module({
    imports: [HunterIoModule, TypeOrmModule.forFeature([Domain, DomainContact])],
    providers: [DomainsService],
    exports: [DomainsService],
})
export class DomainsModule {}
