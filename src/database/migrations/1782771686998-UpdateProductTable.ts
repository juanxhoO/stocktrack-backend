import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductTable1782771686998 implements MigrationInterface {
  name = 'UpdateProductTable1782771686998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "brand" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "sku" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand"`);
  }
}
