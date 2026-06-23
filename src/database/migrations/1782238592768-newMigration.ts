import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1782238592768 implements MigrationInterface {
  name = 'NewMigration1782238592768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "warehouse" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "address" character varying,
                "phone" character varying,
                "city" character varying NOT NULL,
                "state" character varying NOT NULL,
                "zipcode" character varying NOT NULL,
                "country" character varying NOT NULL,
                "isActive" boolean DEFAULT true,
                "manager" character varying,
                "capacity" integer,
                "hasClimateControl" boolean DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "supplier" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "address" character varying,
                "email" character varying,
                "phone" character varying,
                "contactPerson" character varying,
                "observations" character varying,
                "isActive" boolean,
                "taxId" character varying,
                "country" character varying,
                "state" character varying,
                "city" character varying,
                "zipcode" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "price" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "photoId" uuid,
                CONSTRAINT "REL_2910df1471f6bf34df891d72e1" UNIQUE ("photoId"),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "description" character varying,
                "productId" integer,
                "quantity" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "photoId" uuid,
                "statusId" integer,
                CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"),
                CONSTRAINT "REL_e79f3fad5ac0030f01b52fcf6c" UNIQUE ("photoId"),
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP COLUMN "productId"
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP COLUMN "quantity"
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD "productId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD "quantity" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_2910df1471f6bf34df891d72e17" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD CONSTRAINT "FK_e79f3fad5ac0030f01b52fcf6c6" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD CONSTRAINT "FK_ada9c63b1bfb31bd904b3776c89" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "category" DROP CONSTRAINT "FK_ada9c63b1bfb31bd904b3776c89"
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP CONSTRAINT "FK_e79f3fad5ac0030f01b52fcf6c6"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_2910df1471f6bf34df891d72e17"
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP COLUMN "quantity"
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP COLUMN "productId"
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD "quantity" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD "productId" integer
        `);
    await queryRunner.query(`
            DROP TABLE "category"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
    await queryRunner.query(`
            DROP TABLE "supplier"
        `);
    await queryRunner.query(`
            DROP TABLE "warehouse"
        `);
  }
}
