import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CamaraEntity } from "../entities/camara.entity";
import { CamaraDTO } from "../dto/camara.dto";

export class CamaraService extends BaseService<CamaraEntity> {
    constructor(){
        super(CamaraEntity)
    }

    async findAllCamara(frigorifico:string): Promise<CamaraEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("camara")
            .leftJoinAndSelect("camara.frigorifico", "camaras")
            .where({frigorifico})
 //           .orderBy('camara.name', 'ASC')
            .orderBy('camara.orden', 'ASC')
            .getMany();
    }

    async findCamaraById(id: string):Promise<CamaraEntity | null>{
        return (await this.execRepository).findOneBy({id});   
    }

    async findCamaraByName(frigorifico: string, name: string):Promise<CamaraEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("camara")
            .leftJoinAndSelect("camara.frigorifico", "camaras")
            .where({name, frigorifico})
            .getOne();        
    }

    async createCamara(body: CamaraDTO):Promise<CamaraEntity>{
        return (await this.execRepository).save(body);
    }

    async deleteCamara(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }

    async updateCamara(id: string, infoUpdate: CamaraDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate);
    }

}