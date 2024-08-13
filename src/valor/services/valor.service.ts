import { DeleteResult, UpdateResult, InsertResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ValorEntity } from "../entities/valor.entity";
import { ValorDTO } from "../dto/valor.dto";

export class ValorService extends BaseService<ValorEntity> {
    constructor(){
        super(ValorEntity)
    }

    async findAllValoresSensor(sensor: string): Promise<ValorEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("valor")
            .leftJoinAndSelect("valor.sensor", "valores")
            .where({sensor})
            .getMany();
    }

    async findUltimoValorSensor(sensor: string): Promise<ValorEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("valor")
            .leftJoinAndSelect("valor.sensor", "valores")
            .orderBy('fecha_hora_value', 'DESC')
            .where({sensor})
            .getOne();
    }

    async findValoresSensor(sensor: string, fechaInicio: Date, fechaFin: Date): Promise<ValorEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("valor")
            .leftJoinAndSelect("valor.sensor", "valores")
            .setParameters({pfechaInicio: fechaInicio, pfechaFin: fechaFin})
            .where({sensor})
            .andWhere("fecha_hora_value >= :pfechaInicio AND fecha_hora_value <= :pfechaFin")
            .orderBy('fecha_hora_value', 'ASC')
            .getMany();
    }


    async findValorById(sensor: string, id: string):Promise<ValorEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("valor")
            .leftJoinAndSelect("valor.sensor", "valores")
            .where({id, sensor})
            .getOne();        
    }


    async createValor(body: ValorDTO):Promise<ValorEntity>{
        return (await this.execRepository).save(body);
    }

    async createValores(body: ValorDTO[]):Promise<InsertResult>{
        return (await this.execRepository)
        .createQueryBuilder()
        .insert()
        .into("valor")
        .values(body)
        .execute()
    }

    async deleteValor(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }

    async updateValor(id: string, infoUpdate: ValorDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate);
    }

}