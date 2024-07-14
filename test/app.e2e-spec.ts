// import { e2e } from 'pactum';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditDto } from 'src/user/dto';
import { CreatebookmarkDto, EditbookmarkDto } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    app.listen(3334);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3334/');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'abdellahouazane@2002.com',
      password: 'abdellah2002',
    };
    describe('Singup', () => {
      it('should singup', () => {
        return pactum
          .spec()
          .post('auth/singup')
          .withBody(dto)
          .expectStatus(201);
      });
      ///dir t3 email erure
      ///dir t3 password erure erure
    });
    describe('Singin', () => {
      it('should singup', () => {
        return pactum
          .spec()
          .post('auth/singin')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
      ///dir t3 email erure
      ///dir t3 password erure erure
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditDto = {
          firstname: 'Vladimir',
          email: 'vlad@codewithvlad.com',
        };
        return pactum
          .spec()
          .patch('users')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstname);
      });
    });
  });
  describe('BookMarks', () => {
    describe('create bookmark', () => {
      const dto: CreatebookmarkDto = {
        title: 'البناء العقدي',
        link: 'C:/Users/البناء%20العقدي%20للجيل%20الصاعد.pdf',
      };
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('get bookmarks', () => {
      it('should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('bookmarks')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('get bookmark by id', () => {});
    describe('edit bookmark', () => {});
    describe('delete bookmark', () => {});
  });
});
