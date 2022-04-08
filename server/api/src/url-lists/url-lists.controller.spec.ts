import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UrlListsController } from './url-lists.controller';
import { UrlListsService } from './url-lists.service';

describe('UrlListsController', () => {
    let app: INestApplication;
    let controller: UrlListsController;

    const urlListsServiceMock = {
        create: jest.fn(() => ({
            data: 'create',
        })),
        paginate: jest.fn(() => ({
            data: 'paginate',
        })),
        findOne: jest.fn(() => ({
            data: 'findOne',
        })),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UrlListsController],
            providers: [UrlListsService],
        })
            .overrideProvider(UrlListsService)
            .useValue(urlListsServiceMock)
            .compile();

        controller = module.get<UrlListsController>(UrlListsController);

        app = module.createNestApplication();
        await app.init();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it(`/GET url-lists`, () => request(app.getHttpServer()).get('/url-lists').expect(200).expect(urlListsServiceMock.paginate()));

    it(`/GET url-lists/:id`, () => request(app.getHttpServer()).get('/url-lists/1').expect(200).expect(urlListsServiceMock.findOne()));

    it(`/POST url-lists`, () => request(app.getHttpServer()).post('/url-lists').expect(201).expect(urlListsServiceMock.create()));

    afterAll(async () => {
        await app.close();
    });
});
