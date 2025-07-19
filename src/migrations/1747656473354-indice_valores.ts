import { MigrationInterface, QueryRunner } from "typeorm";

export class IndiceValores1747656473354 implements MigrationInterface {
    name = 'IndiceValores1747656473354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`idx_sensor_fecha\` ON \`valor\` (\`sensor_id\`, \`fecha_hora_value\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_sensor_fecha\` ON \`valor\``);
    }

}
