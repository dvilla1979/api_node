import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { FrigorificoService } from "../../frigorifico/services/frigorifico.service";
import { CamaraService } from "../../camara/services/camara.service";
import { SensorService } from "../services/sensor.service";
import { ValorService } from "../../valor/services/valor.service";
import moment from "moment";
import { ValorDTO } from "../../valor/dto/valor.dto";

type TypeValoresSensores = {
    sensor: string,
    fecha_hora_value: Date,
    value: string,
    tagName: string
    color_fondo: string,
    color_fuente: string,
}


export class SensorController {
    constructor(
        private readonly sensorService: SensorService = new SensorService(),
        private readonly valorService: ValorService = new ValorService(),
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
            /*if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay sensores registradas");
            }*/

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
                return this.httpresponse.NotAcceptable(res, "Ya existe el sensor registrado");
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
                return this.httpresponse.NotFound(res, "Hay un error en actualizar los datos del sensor");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }



    async updateValoresSensores(req: Request, res: Response){

        //En el body se recibe una lista con todos los sensores con sus nuevos valores para actualizar
        //si la marca hisotrico es true y la fecha_hora_value es mayor 
        //a la almacenada -> crea un nueva valor en la tabla de valores historicos 

        var resultado: string = "";
        var error:boolean = false;

        try{
            const valoresSensores:TypeValoresSensores[]  = req.body as TypeValoresSensores[]; 

            for(const valorSensor of valoresSensores) {


                const data_sensor = await this.sensorService.findSensorById(valorSensor.sensor);


                if (data_sensor) {

                     if(data_sensor.historico) {
                        //Actualiza valor en la tabla de valores hisotricos
                        
                        if (moment(valorSensor.fecha_hora_value).isAfter(moment(data_sensor.fecha_hora_value))) {

                            try {
                                const valor: ValorDTO = {
                                    sensor_id: valorSensor.sensor,
                                    fecha_hora_value: valorSensor.fecha_hora_value,
                                    value: valorSensor.value,          
                                };
                                await this.valorService.createValor(valor/*valorSensor as any*/);
                            }catch(err){
                                error = true;
                                resultado = resultado + "El sensor " + valorSensor.tagName + " dio error al crear nuevo valor" + err + "<br>"  
                              }                                
                        }
                     }

                     data_sensor.value = valorSensor.value;
                     data_sensor.fecha_hora_value = valorSensor.fecha_hora_value;
                     data_sensor.color_fondo = valorSensor.color_fondo;
                     data_sensor.color_fuente = valorSensor.color_fuente;

                     try{
                        //Actualiza valor actual en la tabla del sensor

                        const data: UpdateResult = await this.sensorService.updateSensor(data_sensor.id, 
                            {
                                value: data_sensor.value,
                                fecha_hora_value: data_sensor.fecha_hora_value,
                                color_fondo: data_sensor.color_fondo,
                                color_fuente: data_sensor.color_fuente
                            } as any);

                        if (!data.affected) {
                            error = true;
                            resultado = resultado + "El sensor " + valorSensor.tagName + " no pudo ser actualizado el valor <br>"    
                            console.log("Error  update", resultado)
                        }
                    }catch(err){
                        error = true;
                        resultado = resultado + "El sensor " + valorSensor.tagName + " no pudo ser actualizado el valor con error " + err + "<br>"    
                    }   
                } else {
                    error = true;
                    resultado = resultado + "El sensor " + valorSensor.tagName + " no esta registrado <br>"    
                }
            }

            if (error) {
                return this.httpresponse.Error(res, resultado);
            } else {
                return this.httpresponse.OK(res, "Se actualizaron todos los sensores");
            }   

        }catch(err){
            console.log("Error  crear", resultado)
            return this.httpresponse.Error(res, err);
        }
    }


    async deleteSensor(req: Request, res: Response){
        const {id} = req.params; 
        try{
            //Primero se borran los valores que corresponden a ese sensor
            const data_valores: DeleteResult = await this.valorService.deleteValoresSensor(id);
            /*if (!data_valores.affected) {
               // return this.httpresponse.NotFound(res, "Hay un error en borrar los valores del sensor");
            }*/
            //Luego se borra el sensor
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