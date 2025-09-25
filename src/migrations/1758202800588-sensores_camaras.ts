import { MigrationInterface, QueryRunner } from "typeorm";

export class SensoresCamaras1758202800588 implements MigrationInterface {
    name = 'SensoresCamaras1758202800588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sensor\` CHANGE \`tipo_sensor\` \`tipo_sensor\` enum ('TEMPERATURA', 'HUMEDAD', 'PRESION', 'CAPACIDAD', 'POTENCIA', 'TENSION', 'CORRIENTE', 'COSENO_PHI', 'VELOCIDAD_HZ', 'VELOCIDAD_100', 'MENSAJE_FUNCIONAMIENTO', 'ESTADO_VENTILADORES', 'ESTADO_SOL_ASPIRACION', 'ESTADO_SOL_LIQUIDO', 'ESTADO_SOL_DESHIELO', 'ESTADO_COMPRESOR', 'ESTADO_TORNILLO', 'ESTADO_BOMBA') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`camara\` CHANGE \`tipo_camara\` \`tipo_camara\` enum ('CAMARA_AMONIACO', 'CAMARA_GLICOL', 'COMPRESOR', 'SALA_MAQUINAS', 'MEDIDAS ELECTRICAS') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`camara\` CHANGE \`tipo_camara\` \`tipo_camara\` enum ('CAMARA_AMONIACO', 'CAMARA_GLICOL', 'COMPRESOR', 'SALA_MAQUINAS') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sensor\` CHANGE \`tipo_sensor\` \`tipo_sensor\` enum ('TEMPERATURA', 'HUMEDAD', 'PRESION', 'CAPACIDAD', 'POTENCIA', 'TENSION', 'CORRIENTE', 'COSENO_PHI', 'VELOCIDAD_HZ', 'VELOCIDAD_100', 'MENSAJE_FUNCIONAMIENTO', 'ESTADO_VENTILADORES', 'ESTADO_SOL_ASPIRACION', 'ESTADO_SOL_LIQUIDO', 'ESTADO_SOL_DESHIELO', 'ESTADO_COMPRESOR', 'ESTADO_BOMBA') NOT NULL`);
    }

}
