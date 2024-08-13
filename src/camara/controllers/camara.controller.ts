import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { CamaraService } from "../services/camara.service";
import { FrigorificoService } from "../../frigorifico/services/frigorifico.service";

export class CamaraController {
    constructor(
        private readonly camaraService: CamaraService = new CamaraService(),
        private readonly frigorificoService: FrigorificoService = new FrigorificoService(),
        private readonly httpresponse: HttpResponse = new HttpResponse()
    ) {}
    async getCamaras(req: Request, res: Response){
        try{
            //const name:string = req.params.name_frio as string; 
            const frioId = req.query.frioId as string; 
            const data_frio = await this.frigorificoService.findFrigorificoById(frioId);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            const data = await this.camaraService.findAllCamara(data_frio.id);
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay camaras registradas");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }

    async getCamaraById(req: Request, res: Response){
        const name:string = req.params.name_frio as string; 
        const data_frio = await this.frigorificoService.findFrigorificoByName(name);
        if (!data_frio) {
            return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
        }
        const id:string = req.params.id as string; 
        try{
            const data = await this.camaraService.findCamaraById(id);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe la camara registrada");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getCamaraByName(req: Request, res: Response){
        const name_frio:string = req.params.name_frio as string; 
        const data_frio = await this.frigorificoService.findFrigorificoByName(name_frio);
        if (!data_frio) {
            return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
        }
        const name_camara = req.params.name_camara as string; 
        try{
            const data = await this.camaraService.findCamaraByName(data_frio.id, name_camara);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe la camara registrada");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async createCamara(req: Request, res: Response){
        try{
            const frio_id:string = req.body.frigorifico as string; 
            const data_frio = await this.frigorificoService.findFrigorificoById(frio_id);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            const name_camara = req.body.name as string; 
            const data_camara = await this.camaraService.findCamaraByName(data_frio.id, name_camara);
            if (data_camara) {
                return this.httpresponse.Forbidden(res, "Ya existe la camara registrada");
            }
            const data = await this.camaraService.createCamara(req.body);
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async updtaeCamara(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: UpdateResult = await this.camaraService.updateCamara(id, req.body);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en actualizar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async deleteCamara(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: DeleteResult = await this.camaraService.deleteCamara(id);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en borrar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


}