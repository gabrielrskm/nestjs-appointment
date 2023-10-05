import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('login and get user', () => { 
    let token: string;
    it('login with user valid and previously created', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'gabriel.rskm@gmail.com', password: 'pass123' })
        .expect(200)
        .expect((res: any) => {
          expect(res.body).toHaveProperty('token');
          token = res.body.token;
        });
    });

    it('get user info with token', () => {
      
      return request(app.getHttpServer())
        .get('/user/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toHaveProperty('email');
        })
    })
  })
});
