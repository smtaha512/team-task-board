import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1755926596493 implements MigrationInterface {
  name = 'InitialMigration1755926596493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team_task_board"."column" ("column_id" character varying(40) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "PK_column_id" PRIMARY KEY ("column_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "team_task_board"."column"`);
  }
}
