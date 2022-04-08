import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Demo1Module } from './demo1.module';
import { Demo1Service } from './demo1.service';
describe('Demo1Service', () => {
  jest.setTimeout(90000);
  let service: Demo1Service;
  let app: INestApplication;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Demo1Module],
      providers: [],
    }).compile();
    app = module.createNestApplication();
    service = module.get<Demo1Service>(Demo1Service);
    await app.init();
  });
  it('test1', async () => {
    await service.test1('klover', 80);
  });

  it('MethodDecorator', async () => {
    console.log(service.author);
  });

  it('test2', async () => {
    await service.test2('klover', 80);
  });

  it('VisitDecorator', async () => {
    // service.setAuthor = 'wangjiancheng';
    console.log(service.getAuthor);
  });

  it('run', async () => {});
});
