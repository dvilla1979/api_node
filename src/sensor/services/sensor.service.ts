import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { SensorEntity } from "../entities/sensor.entity";
import { SensorDTO } from "../dto/sensor.dto";

export class SensorService extends BaseService<SensorEntity> {
    constructor(){
        super(SensorEntity)
    }

    async findAllSensorFrigorifico(frigorifico: string): Promise<SensorEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("sensor")
            .leftJoinAndSelect("sensor.frigorifico", "sensors")
            .where({frigorifico})
            .getMany();
    }


    async findAllSensorCamara(camara: string): Promise<SensorEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("sensor")
            .leftJoinAndSelect("sensor.camara", "sensors")
            .where({camara})
            .orderBy('sensor.name_front', 'ASC')
            .getMany();
    }

    async findSensorById(id: string):Promise<SensorEntity | null>{
        return (await this.execRepository).findOneBy({id});       
    }

    async findSensorByName(camara: string, name_db: string):Promise<SensorEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("sensor")
            .leftJoinAndSelect("sensor.camara", "sensors")
            .where({name_db, camara})
            .getOne();        
    }

    async createSensor(body: SensorDTO):Promise<SensorEntity>{
        return (await this.execRepository).save(body);
    }

    //Para borrar un sensor, primero hay que borrar todos los valores asociados a ese sensor
    async deleteSensor(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }

    async updateSensor(id: string, infoUpdate: SensorDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate);
    }

}