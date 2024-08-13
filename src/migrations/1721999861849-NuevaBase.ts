import { MigrationInterface, QueryRunner } from "typeorm";

export class NuevaBase1721999861849 implements MigrationInterface {
    name = 'NuevaBase1721999861849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`valor\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`value\` varchar(255) NOT NULL, \`fecha_hora_value\` datetime NOT NULL, \`sensor_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sensor\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name_db\` varchar(255) NOT NULL, \`name_front\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, \`tipo_dato\` enum ('BOOLEAN', 'INT16', 'INT32', 'FECHA_HORA', 'FECHA', 'SEMANA_HORA', 'DIA_HORA', 'HORA', 'REAL', 'REAL_DIV_10') NOT NULL, \`tipo_sensor\` enum ('TEMPERATURA', 'PRESION', 'POTENCIA') NOT NULL, \`color_front\` enum ('RED', 'BLUE', 'GREEN', 'BLACK', 'ORANGE', 'YELLOW', 'PURPLE', 'PINK', 'BROWN', 'WHITE') NOT NULL, \`frigorifico_id\` varchar(36) NULL, \`camara_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`camara\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`frigorifico_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`frigorigico\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`job_positions\` varchar(255) NULL, \`number_phone\` int NOT NULL, \`role\` enum ('USER', 'GERENTE', 'ADMIN') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_frigorifico_frigorigico\` (\`users_id\` varchar(36) NOT NULL, \`frigorigico_id\` varchar(36) NOT NULL, INDEX \`IDX_7ca9c9d1fa91fd537c2f9b1c61\` (\`users_id\`), INDEX \`IDX_8de17b9c115f4b6680849218fe\` (\`frigorigico_id\`), PRIMARY KEY (\`users_id\`, \`frigorigico_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`valor\` ADD CONSTRAINT \`FK_6554d8cecce22fac3216df7f15e\` FOREIGN KEY (\`sensor_id\`) REFERENCES \`sensor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sensor\` ADD CONSTRAINT \`FK_c27dcb02f20aff3589be423699e\` FOREIGN KEY (\`frigorifico_id\`) REFERENCES \`frigorigico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sensor\` ADD CONSTRAINT \`FK_832fc9208ba9b57b43585c75b0b\` FOREIGN KEY (\`camara_id\`) REFERENCES \`camara\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`camara\` ADD CONSTRAINT \`FK_b326870beed438c80ef8b1c779c\` FOREIGN KEY (\`frigorifico_id\`) REFERENCES \`frigorigico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_frigorifico_frigorigico\` ADD CONSTRAINT \`FK_7ca9c9d1fa91fd537c2f9b1c612\` FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_frigorifico_frigorigico\` ADD CONSTRAINT \`FK_8de17b9c115f4b6680849218fee\` FOREIGN KEY (\`frigorigico_id\`) REFERENCES \`frigorigico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_frigorifico_frigorigico\` DROP FOREIGN KEY \`FK_8de17b9c115f4b6680849218fee\``);
        await queryRunner.query(`ALTER TABLE \`users_frigorifico_frigorigico\` DROP FOREIGN KEY \`FK_7ca9c9d1fa91fd537c2f9b1c612\``);
        await queryRunner.query(`ALTER TABLE \`camara\` DROP FOREIGN KEY \`FK_b326870beed438c80ef8b1c779c\``);
        await queryRunner.query(`ALTER TABLE \`sensor\` DROP FOREIGN KEY \`FK_832fc9208ba9b57b43585c75b0b\``);
        await queryRunner.query(`ALTER TABLE \`sensor\` DROP FOREIGN KEY \`FK_c27dcb02f20aff3589be423699e\``);
        await queryRunner.query(`ALTER TABLE \`valor\` DROP FOREIGN KEY \`FK_6554d8cecce22fac3216df7f15e\``);
        await queryRunner.query(`DROP INDEX \`IDX_8de17b9c115f4b6680849218fe\` ON \`users_frigorifico_frigorigico\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ca9c9d1fa91fd537c2f9b1c61\` ON \`users_frigorifico_frigorigico\``);
        await queryRunner.query(`DROP TABLE \`users_frigorifico_frigorigico\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`frigorigico\``);
        await queryRunner.query(`DROP TABLE \`camara\``);
        await queryRunner.query(`DROP TABLE \`sensor\``);
        await queryRunner.query(`DROP TABLE \`valor\``);
    }

}
