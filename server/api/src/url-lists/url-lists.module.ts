import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlListsService } from './url-lists.service';
import { UrlListsController } from './url-lists.controller';
import { UrlList } from './entities/url-list.entity';
import { DomainsModule } from '../domains/domains.module';

@Module({
    imports: [TypeOrmModule.forFeature([UrlList]), DomainsModule],
    controllers: [UrlListsController],
    providers: [UrlListsService],
    exports: [TypeOrmModule],
})
export class UrlListsModule {}
