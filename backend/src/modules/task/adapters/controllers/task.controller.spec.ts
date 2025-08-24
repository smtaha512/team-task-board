import { HttpStatus } from '@nestjs/common';
import { TestApplication } from '../../../../shared/testing/test.app';
import { createColumnId } from '../../../column/domain/column';
import { ColumnRepository } from '../../../column/domain/column.repository';
import { CreateTaskRequestBodyDto } from '../../app/use-cases/create-task/dtos/create-task.request.body.dto';

describe('TaskController', () => {
  let app: TestApplication;
  let columnRepository: ColumnRepository;

  beforeAll(async () => {
    app = new TestApplication();

    await app.beforeAll();

    columnRepository = app.get(ColumnRepository);
  });

  beforeEach(async () => {
    await app.beforeEach();
  });

  afterAll(async () => {
    await app.afterAll();
  });

  describe('POST /tasks', () => {
    describe('error scenarios', () => {
      it(`should throw ${HttpStatus.BAD_REQUEST} if title is empty`, async () => {
        const columns = await columnRepository.findAllColumns();

        const body: CreateTaskRequestBodyDto = {
          description: 'description',
          title: '',
          columnId: columns[0].id,
        };

        const response = await app
          .request('post', '/tasks')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST);

        expect(response.body).toStrictEqual(
          expect.objectContaining({
            error: 'Bad Request',
            message: ['title should not be empty'],
            statusCode: HttpStatus.BAD_REQUEST,
          }),
        );
      });

      it(`should throw ${HttpStatus.BAD_REQUEST} if columnId is empty`, async () => {
        const body: CreateTaskRequestBodyDto = {
          description: 'description',
          title: 'title',
          columnId: '',
        };

        const response = await app
          .request('post', '/tasks')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST);

        expect(response.body).toStrictEqual(
          expect.objectContaining({
            error: 'Bad Request',
            message: [
              'columnId should not be empty',
              'columnId is not a valid id',
            ],
            statusCode: HttpStatus.BAD_REQUEST,
          }),
        );
      });

      it(`should throw ${HttpStatus.NOT_FOUND} if column is not present in the database`, async () => {
        const body: CreateTaskRequestBodyDto = {
          description: 'description',
          title: 'title',
          columnId: createColumnId(),
        };

        const response = await app
          .request('post', '/tasks')
          .send(body)
          .expect(HttpStatus.NOT_FOUND);

        expect(response.body).toStrictEqual(
          expect.objectContaining({
            error: 'Not Found',
            message: `Cannot find column with criteria: {"id":"${body.columnId}"}`,
            statusCode: HttpStatus.NOT_FOUND,
          }),
        );
      });
    });

    describe('success scenarios', () => {
      it('should create a task', async () => {
        const columns = await columnRepository.findAllColumns();

        const body: CreateTaskRequestBodyDto = {
          description: 'description',
          title: 'title',
          columnId: columns[0].id,
        };

        const response = await app
          .request('post', '/tasks')
          .send(body)
          .expect(HttpStatus.CREATED);

        expect(response.body).toStrictEqual(
          expect.objectContaining({
            ...body,
            id: expect.stringContaining('tsk_'),
          }),
        );
      });
    });
  });
});
