import { MigrationInterface, QueryRunner } from 'typeorm';
import { createId } from '../../../shared/utils/create-id';

export class AddColumnsSeed1756060151128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO team_task_board."column"
        (       column_id,              created_at, updated_at, title)
        VALUES('${createId('col')()}',  now(),      now(),      'Todo');
    `);
    await queryRunner.query(`
        INSERT INTO team_task_board."column"
        (       column_id,              created_at, updated_at, title)
        VALUES('${createId('col')()}',  now(),      now(),      'In progress');
    `);
    await queryRunner.query(`
        INSERT INTO team_task_board."column"
        (       column_id,              created_at, updated_at, title)
        VALUES('${createId('col')()}',  now(),      now(),      'Done');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
