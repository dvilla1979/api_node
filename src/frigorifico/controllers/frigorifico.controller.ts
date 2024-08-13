import { Request, Response } from "express";
import { FrigorificoService } from "../services/frigorifico.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class FrigorificoController {
    constructor(
        private readonly frigorificoService: FrigorificoService = new FrigorificoService(),
        private readonly httpresponse: HttpResponse = new HttpResponse()
    ) {}
    async getFrigorificos(req: Request, res: Response){
        try{
            const data = await this.frigorificoService.findAllFrigorifico();
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay frigorificos registrados");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getFrigorificoById(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data = await this.frigorificoService.findFrigorificoById(id);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getFrigorificoByName(req: Request, res: Response){
        const name: string = req.query.name_frio as string; 
        try{
            const data = await this.frigorificoService.findFrigorificoByName(name);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async createFrigorifico(req: Request, res: Response){
        try{
            const data = await this.frigorificoService.createFrigorifico(req.body);
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async updtaeFrigorifico(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: UpdateResult = await this.frigorificoService.updateFrigorifico(id, req.body);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en actualizar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async deleteFrigorifico(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: DeleteResult = await this.frigorificoService.deleteFrigorifico(id);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en borrar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


}