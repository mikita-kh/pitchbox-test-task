import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UrlList } from './url-lists/entities/url-list.entity';
import { Domain } from './domains/entities/domain.entity';
import { DomainContact } from './domains/entities/domain-contact.entity';
import { UrlListsModule } from './url-lists/url-lists.module';
import { HunterIoModule } from './hunter-io/hunter-io.module';
import { DomainsModule } from './domains/domains.module';
import { UrlListsService } from './url-lists/url-lists.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env.local', '.env'],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get<number>('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: [UrlList, Domain, DomainContact],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        process.env.NODE_ENV === 'production' &&
            ServeStaticModule.forRoot({
                rootPath: join(__dirname, '..', '..', '..', 'client', 'app', 'build'),
                exclude: ['/api'],
            }),
        HunterIoModule,
        DomainsModule,
        UrlListsModule,
    ].filter(Boolean),
    providers: [UrlListsService],
})
export class AppModule {}
