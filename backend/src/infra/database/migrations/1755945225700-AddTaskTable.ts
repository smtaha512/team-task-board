import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskTable1755945225700 implements MigrationInterface {
  name = 'AddTaskTable1755945225700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team_task_board"."task" ("task_id" character varying(40) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "column_id" character varying NOT NULL, CONSTRAINT "PK_task_id" PRIMARY KEY ("task_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_task_board"."task" ADD CONSTRAINT "FK_tasks_column" FOREIGN KEY ("column_id") REFERENCES "team_task_board"."column"("column_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team_task_board"."task" DROP CONSTRAINT "FK_tasks_column"`,
    );
    await queryRunner.query(`DROP TABLE "team_task_board"."task"`);
  }
}
