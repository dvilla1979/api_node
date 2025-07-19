import { MigrationInterface, QueryRunner } from "typeorm";

export class Valores1747682442894 implements MigrationInterface {
    name = 'Valores1747682442894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`valor\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(20) NOT NULL, \`fecha_hora_value\` datetime NOT NULL, \`sensor_id\` varchar(36) NOT NULL, INDEX \`idx_sensor_fecha\` (\`sensor_id\`, \`fecha_hora_value\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`valor\` ADD CONSTRAINT \`FK_6554d8cecce22fac3216df7f15e\` FOREIGN KEY (\`sensor_id\`) REFERENCES \`sensor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`valor\` DROP FOREIGN KEY \`FK_6554d8cecce22fac3216df7f15e\``);
        await queryRunner.query(`DROP INDEX \`idx_sensor_fecha\` ON \`valor\``);
        await queryRunner.query(`DROP TABLE \`valor\``);
    }

}
