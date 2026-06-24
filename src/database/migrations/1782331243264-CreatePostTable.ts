import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1782331243264 implements MigrationInterface {
  name = 'CreatePostTable1782331243264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" RENAME COLUMN "manager" TO "managerId"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "category" ADD "productId" integer`);
    await queryRunner.query(`ALTER TABLE "category" ADD "quantity" integer`);
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "managerId"`);
    await queryRunner.query(`ALTER TABLE "warehouse" ADD "managerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD CONSTRAINT "FK_365d11d960742455a78593b5784" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP CONSTRAINT "FK_365d11d960742455a78593b5784"`,
    );
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "managerId"`);
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "managerId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "category" ADD "quantity" integer`);
    await queryRunner.query(`ALTER TABLE "category" ADD "productId" integer`);
    await queryRunner.query(
      `ALTER TABLE "warehouse" RENAME COLUMN "managerId" TO "manager"`,
    );
  }
}
