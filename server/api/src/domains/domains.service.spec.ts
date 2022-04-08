import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DomainsService } from './domains.service';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';
import { HunterIoService } from '../hunter-io/hunter-io.service';

describe('DomainsService', () => {
    let service: DomainsService;
    let hunterIOServiceMock: Record<'domainSearch', jest.Mock>;
    let domainsRepositoryMock: Record<'findOne', jest.Mock>;
    let domainContactRepositoryMock: Record<'save', jest.Mock>;

    beforeEach(async () => {
        hunterIOServiceMock = {
            domainSearch: jest.fn(() =>
                Promise.resolve([
                    {
                        value: 'external1@test.com',
                        first_name: 'first_name1',
                        last_name: 'last_name1',
                        confidence: 80,
                    },
                    {
                        value: 'external2@test.com',
                        first_name: 'first_name2',
                        last_name: 'last_name2',
                        confidence: 90,
                    },
                ]),
            ),
        };

        domainsRepositoryMock = {
            findOne: jest.fn(({ domainName }: { domainName: string }) =>
                Promise.resolve(
                    domainName === 'existed'
                        ? {
                              domainName,
                              contacts: [
                                  {
                                      email: 'local1@test.com',
                                  },
                                  {
                                      email: 'local1@test.com',
                                  },
                              ],
                          }
                        : undefined,
                ),
            ),
        };

        domainContactRepositoryMock = {
            save: jest.fn(() => Promise.resolve()),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DomainsService,
                HunterIoService,
                {
                    provide: getRepositoryToken(Domain),
                    useValue: domainsRepositoryMock,
                },
                {
                    provide: getRepositoryToken(DomainContact),
                    useValue: domainContactRepositoryMock,
                },
            ],
        })
            .overrideProvider(HunterIoService)
            .useValue(hunterIOServiceMock)
            .compile();

        service = module.get<DomainsService>(DomainsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be get existed domain', async () => {
        expect(await service.get('existed')).toEqual({
            contacts: [
                {
                    email: 'local1@test.com',
                },
                {
                    email: 'local1@test.com',
                },
            ],
            domainName: 'existed',
        });

        expect(domainsRepositoryMock.findOne).toHaveBeenCalled();
        expect(hunterIOServiceMock.domainSearch).not.toHaveBeenCalled();
    });

    it('should be get not existed domain', async () => {
        expect(await service.get('not-existed')).toEqual({
            contacts: [
                {
                    confidence: 80,
                    email: 'external1@test.com',
                    firstName: 'first_name1',
                    lastName: 'last_name1',
                },
                {
                    confidence: 90,
                    email: 'external2@test.com',
                    firstName: 'first_name2',
                    lastName: 'last_name2',
                },
            ],
            domainName: 'not-existed',
        });

        expect(domainsRepositoryMock.findOne).toHaveBeenCalled();
        expect(hunterIOServiceMock.domainSearch).toHaveBeenCalled();
        expect(domainContactRepositoryMock.save).toHaveBeenCalledTimes(2);
    });
});
