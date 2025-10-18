import { MigrationInterface, QueryRunner } from "typeorm";

export class SensoresCamaras1758826874326 implements MigrationInterface {
    name = 'SensoresCamaras1758826874326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sensor\` CHANGE \`tipo_sensor\` \`tipo_sensor\` enum ('TEMPERATURA', 'SET_POINT_TEMPERATURA', 'HUMEDAD', 'PRESION', 'SET_POINT_PRESION', 'CAPACIDAD', 'POTENCIA', 'SET_POTENCIA', 'TENSION', 'CORRIENTE', 'COSENO_PHI', 'VELOCIDAD_HZ', 'VELOCIDAD_100', 'APERTURA_VALVULA', 'MENSAJE_FUNCIONAMIENTO', 'ESTADO_VENTILADORES', 'ESTADO_SOL_ASPIRACION', 'ESTADO_SOL_LIQUIDO', 'ESTADO_SOL_DESHIELO', 'ESTADO_VALVULA', 'ESTADO_COMPRESOR', 'ESTADO_TORNILLO', 'ESTADO_BOMBA') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sensor\` CHANGE \`tipo_sensor\` \`tipo_sensor\` enum ('TEMPERATURA', 'HUMEDAD', 'PRESION', 'CAPACIDAD', 'POTENCIA', 'TENSION', 'CORRIENTE', 'COSENO_PHI', 'VELOCIDAD_HZ', 'VELOCIDAD_100', 'MENSAJE_FUNCIONAMIENTO', 'ESTADO_VENTILADORES', 'ESTADO_SOL_ASPIRACION', 'ESTADO_SOL_LIQUIDO', 'ESTADO_SOL_DESHIELO', 'ESTADO_COMPRESOR', 'ESTADO_TORNILLO', 'ESTADO_BOMBA') NOT NULL`);
    }

}
