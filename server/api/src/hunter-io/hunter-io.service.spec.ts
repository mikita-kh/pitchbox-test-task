import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { HunterIoService } from './hunter-io.service';

describe('HunterIoService', () => {
    let service: HunterIoService;
    let configServiceMock: Record<'get', jest.Mock>;
    let httpServiceMock: Record<'get', jest.Mock>;

    beforeEach(async () => {
        configServiceMock = {
            get: jest.fn((val: unknown) => (val === 'HUNTER_IO_API_KEY' ? 'api_key' : val)),
        };

        httpServiceMock = {
            get: jest.fn((url: string, config: AxiosRequestConfig) => ({
                toPromise: () =>
                    Promise.resolve({
                        data:
                            (config.params as Record<string, string>).domain === 'domain'
                                ? {
                                      data: {
                                          emails: [{ value: 'email@test.com' }],
                                      },
                                  }
                                : {},
                    }),
            })),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [HunterIoService, ConfigService, HttpService],
        })
            .overrideProvider(ConfigService)
            .useValue(configServiceMock)
            .overrideProvider(HttpService)
            .useValue(httpServiceMock)
            .compile();

        service = module.get<HunterIoService>(HunterIoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be search domain', async () => {
        expect(await service.domainSearch('domain')).toEqual([{ value: 'email@test.com' }]);

        expect(configServiceMock.get).toHaveBeenCalled();
        expect(httpServiceMock.get).toHaveBeenCalledWith('https://api.hunter.io/v2/domain-search', {
            params: {
                domain: 'domain',
                api_key: 'api_key',
            },
        });
    });

    it('should be return empty list', async () => {
        expect(await service.domainSearch('empty')).toEqual([]);
    });
});
