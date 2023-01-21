import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateTicketDto, EditTicketDto } from 'src/ticket/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test1@email.com',
      password: 'password123',
    };
    describe('signup', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw exception if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('login', () => {
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });

      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw exception if no body provided', () => {
        return pactum.spec().post('/auth/login').withBody({}).expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Matthew',
          email: 'matt@email.com',
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Tickets', () => {
    describe('Get empty tickets', () => {
      it('should get tickets', () => {
        return pactum
          .spec()
          .get('/ticket/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create Ticket', () => {
      it('should create a ticket', () => {
        const x = new Date();
        const completed = x.toISOString();
        const dto: CreateTicketDto = {
          title: 'my test ticket',
          completed,
        };
        return pactum
          .spec()
          .post('/ticket/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get Tickets', () => {
      it('should get tickets', () => {
        return pactum
          .spec()
          .get('/ticket/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get Ticket by Id', () => {
      it('should get tickets', () => {
        return pactum
          .spec()
          .get('/ticket/{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withPathParams('id', '$S{bookmarkId}')
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe('Edit Ticket', () => {
      const dto: EditTicketDto = {
        comfort_level: 4,
      };
      describe('Edit ticket', () => {
        it('should edit a ticket', () => {
          return pactum
            .spec()
            .patch('/ticket/{id}')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withPathParams('id', '$S{bookmarkId}')
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.comfort_level);
        });
      });
    });
    describe('Delete Ticket', () => {
      it('should delete a ticket', () => {
        return pactum
          .spec()
          .delete('/ticket/{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withPathParams('id', '$S{bookmarkId}')
          .expectStatus(204);
      });
      it('should get empty tickets', () => {
        return pactum
          .spec()
          .get('/ticket/')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
