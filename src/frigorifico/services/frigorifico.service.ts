import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { FrigorificoEntity } from "../entities/frigorifico.entity";
import { FrigorificoDTO } from "../dto/frigorifico.dto";

export class FrigorificoService extends BaseService<FrigorificoEntity> {
    constructor(){
        super(FrigorificoEntity)
    }

    async findAllFrigorifico(): Promise<FrigorificoEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("frigorifico")
            //.orderBy('frigorifico.name', 'ASC')
            .orderBy('frigorifico.orden', 'ASC')
            .getMany();
    }

    async findFrigorificoById(id: string):Promise<FrigorificoEntity | null>{
        return (await this.execRepository).findOneBy({id});
    }

    async findFrigorificoByName(name: string):Promise<FrigorificoEntity | null>{
        return (await this.execRepository).findOneBy({name});
   }


    async createFrigorifico(body: FrigorificoDTO):Promise<FrigorificoEntity>{
        return (await this.execRepository).save(body);
    }

    async deleteFrigorifico(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }

    async updateFrigorifico(id: string, infoUpdate: FrigorificoDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate);
    }

}