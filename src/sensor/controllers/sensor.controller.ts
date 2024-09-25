import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { FrigorificoService } from "../../frigorifico/services/frigorifico.service";
import { CamaraService } from "../../camara/services/camara.service";
import { SensorService } from "../services/sensor.service";

export class SensorController {
    constructor(
        private readonly sensorService: SensorService = new SensorService(),
        private readonly frigorificoService: FrigorificoService = new FrigorificoService(),
        private readonly camaraService: CamaraService = new CamaraService(),
        private readonly httpresponse: HttpResponse = new HttpResponse()
    ) {}

    async getSensoresCamaraById(req: Request, res: Response){
        try{
            const camaraId:string = req.query.camaraId as string; 
            const data_camara = await this.camaraService.findCamaraById(camaraId);
            if (!data_camara) {
                return this.httpresponse.NotFound(res, "No existe la camaras registrada");
            }
            const data = await this.sensorService.findAllSensorCamara(data_camara.id);
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay sensores registradas");
            }

            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }

    async getSensoresFrigorifico(req: Request, res: Response){
        try{
            const name_frio:string = req.query.name_frio as string; 
            const data_frio = await this.frigorificoService.findFrigorificoByName(name_frio);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, `No existe el frigorifico registrado`);
            }

            const data = await this.sensorService.findAllSensorFrigorifico(data_frio.id);
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay sensores registradas");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }   

    async getSensoresCamara(req: Request, res: Response){
        try{
            const name_frio:string = req.params.name_frio as string; 
            const data_frio = await this.frigorificoService.findFrigorificoByName(name_frio);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            const name_camara:string = req.params.name_camara as string; 
            const data_camara = await this.camaraService.findCamaraByName(data_frio.id, name_camara);
            if (!data_camara) {
                return this.httpresponse.NotFound(res, "No existe la camaras registrada");
            }
            const data = await this.sensorService.findAllSensorCamara(data_camara.id);
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay sensores registradas");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }

 
    async getSensorById(req: Request, res: Response){
        const id:string = req.params.id as string; 
        try{
            const data = await this.sensorService.findSensorById(id);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el sensor registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getSensorByName(req: Request, res: Response){
        const name_frio:string = req.params.name_frio as string; 
        const data_frio = await this.frigorificoService.findFrigorificoByName(name_frio);
        if (!data_frio) {
            return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
        }
        const name_camara:string = req.params.name_camara as string; 
        const data_camara = await this.camaraService.findCamaraByName(data_frio.id, name_camara);
        if (!data_camara) {
            return this.httpresponse.NotFound(res, "No existe la camaras registrada");
        }
        const name_sensor = req.params.name_sensor as string; 
        try{
            const data = await this.sensorService.findSensorByName(data_camara.id, name_sensor);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el sensor registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async createSensor(req: Request, res: Response){
        try{
            console.log("req.body", req.body);
            const frio_id:string = req.body.frigorifico as string; 
            const data_frio = await this.frigorificoService.findFrigorificoById(frio_id);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }
            const camara_id:string = req.body.camara as string; 
            const data_camara = await this.camaraService.findCamaraById(camara_id);
            if (!data_camara) {
                return this.httpresponse.NotFound(res, "No existe la camara registrada");
            }

            const name_sensor = req.body.name_db as string; 
            const data_sensor = await this.sensorService.findSensorByName(data_camara.id, name_sensor);
            if (data_sensor) {
                return this.httpresponse.Forbidden(res, "Ya existe el sensor registrado");
            }
            
            const data = await this.sensorService.createSensor(req.body);
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async updateSensor(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: UpdateResult = await this.sensorService.updateSensor(id, req.body);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en actualizar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async deleteSensor(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: DeleteResult = await this.sensorService.deleteSensor(id);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en borrar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


}