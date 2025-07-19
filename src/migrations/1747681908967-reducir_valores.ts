import { MigrationInterface, QueryRunner } from "typeorm";

export class ReducirValores1747681908967 implements MigrationInterface {
    name = 'ReducirValores1747681908967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`valor\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`valor\` ADD \`value\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`valor\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`valor\` ADD \`value\` varchar(255) NOT NULL`);
    }

}
