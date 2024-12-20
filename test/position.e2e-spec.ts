import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ApiRouteEnum } from '../src/enum/api-route.enum';
import { testConst } from '../src/const/testConst';

describe('Position controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('fixed-position', () => {
    const req = {
      userKey: testConst.testUserKey,
      bookId: testConst.fixedPositionBookId,
      position: testConst.fixedPositionValue,
    };

    return request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req)
      .expect(201)
      .then((response) => {
        expect(response.body.position).toEqual(testConst.fixedPositionValue);
      });
  });

  it('wrongTestUserKey', () => {
    const req = {
      userKey: testConst.wrongTestUserKey,
      bookId: testConst.fixedPositionBookId,
      position: testConst.fixedPositionValue,
    };

    return request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req)
      .expect(401);
  });

  it('counterBookId', async function () {
    const req = {
      userKey: testConst.testUserKey,
      bookId: testConst.counterBookId,
      position: 0,
    };

    const response = await request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req);

    const currentPosition = response.body.position;
    const newCurrentPosition = currentPosition + 1;

    const req2 = {
      ...req,
      position: newCurrentPosition,
    };

    const res2 = await request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req2);

    expect(res2.status).toEqual(201);
    expect(res2.body.position).toEqual(newCurrentPosition);
  });

  it('wrong request: userKey', async function () {
    const req = {
      userKey: '',
      bookId: testConst.counterBookId,
      position: 0,
    };

    const response = await request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req);

    expect(response.status).toEqual(400);
  });

  it('wrong request: bookId', async function () {
    const req = {
      userKey: '',
      bookId: { test: 1 },
      position: 0,
    };

    const response = await request(app.getHttpServer())
      .post('/' + ApiRouteEnum.position)
      .send(req);

    expect(response.status).toEqual(400);
  });
});
