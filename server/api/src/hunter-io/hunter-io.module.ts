import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HunterIoService } from './hunter-io.service';

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [HunterIoService],
    exports: [HunterIoService],
})
export class HunterIoModule {}
