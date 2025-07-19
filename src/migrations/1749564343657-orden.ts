import { MigrationInterface, QueryRunner } from "typeorm";

export class Orden1749564343657 implements MigrationInterface {
    name = 'Orden1749564343657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sensor\` ADD \`orden\` varchar(255) NOT NULL DEFAULT 'A'`);
        await queryRunner.query(`ALTER TABLE \`camara\` ADD \`orden\` varchar(255) NOT NULL DEFAULT 'A'`);
        await queryRunner.query(`ALTER TABLE \`frigorigico\` CHANGE \`orden\` \`orden\` varchar(255) NOT NULL DEFAULT 'A'`);
        await queryRunner.query(`CREATE INDEX \`IDX_439d3707531d2dec9ac3ca7b2e\` ON \`sensor\` (\`orden\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_0f584970c47aaa2ab49853298f\` ON \`camara\` (\`orden\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0f584970c47aaa2ab49853298f\` ON \`camara\``);
        await queryRunner.query(`DROP INDEX \`IDX_439d3707531d2dec9ac3ca7b2e\` ON \`sensor\``);
        await queryRunner.query(`ALTER TABLE \`frigorigico\` CHANGE \`orden\` \`orden\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`camara\` DROP COLUMN \`orden\``);
        await queryRunner.query(`ALTER TABLE \`sensor\` DROP COLUMN \`orden\``);
    }

}
