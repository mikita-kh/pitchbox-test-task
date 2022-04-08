import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { paginate as paginateMock } from 'nestjs-typeorm-paginate';
import { UrlListsService } from './url-lists.service';
import { UrlList } from './entities/url-list.entity';
import { DomainsService } from '../domains/domains.service';

jest.mock('nestjs-typeorm-paginate', () => ({
    paginate: jest.fn(),
}));

describe('UrlListsService', () => {
    let service: UrlListsService;

    let domainsServiceMock: Record<'get', jest.Mock>;

    let urlListsRepositoryMock: Record<'findOne' | 'save', jest.Mock>;

    beforeEach(async () => {
        domainsServiceMock = {
            get: jest.fn((domain: string) => ({
                id: Math.floor(1e5 * Math.random()),
                domain,
            })),
        };

        urlListsRepositoryMock = {
            findOne: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UrlListsService,
                DomainsService,
                {
                    provide: getRepositoryToken(UrlList),
                    useValue: urlListsRepositoryMock,
                },
            ],
        })
            .overrideProvider(DomainsService)
            .useValue(domainsServiceMock)
            .compile();

        service = module.get<UrlListsService>(UrlListsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be findOne', async () => {
        await service.findOne(1);

        expect(urlListsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
        expect(urlListsRepositoryMock.findOne).toHaveBeenCalledWith(1, expect.objectContaining({}));
    });

    it('should be create', async () => {
        await service.create({
            listName: 'test',
            domains: ['a', 'b', 'c'],
        });

        expect(domainsServiceMock.get).toHaveBeenCalledTimes(3);
        expect(urlListsRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(urlListsRepositoryMock.save).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'test',
                domains: expect.arrayContaining([
                    expect.objectContaining({ domain: 'a' }),
                    expect.objectContaining({ domain: 'b' }),
                    expect.objectContaining({ domain: 'c' }),
                ]) as [],
            }),
        );
    });
    it('should be paginate', async () => {
        await service.paginate({ limit: 10, page: 10 });
        expect(paginateMock).toHaveBeenCalledTimes(1);
        expect(paginateMock).toHaveBeenCalledWith(urlListsRepositoryMock, { limit: 10, page: 10 }, expect.objectContaining({}));
    });
});
