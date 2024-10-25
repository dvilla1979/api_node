import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { ValorService } from "../services/valor.service";
import { SensorService } from "../../sensor/services/sensor.service";
import { FrigorificoService } from "../../frigorifico/services/frigorifico.service";
import { CamaraService } from "../../camara/services/camara.service";
import { SensorEntity } from "../../sensor/entities/sensor.entity";
import { SensorColor, SensorDato, SensorType } from "../../sensor/dto/sensor.dto";
import moment from 'moment';

type TypeValor = {
    fecha_hora_value: string | undefined,
    value: string | undefined,
}

type TypeSensor = {
    id: string,
    name_db: string,
    name_front:string,
    descripcion: string | undefined,
    tipo_dato: SensorDato,
    tipo_sensor: SensorType,
    color_front: SensorColor,
    valores: TypeValor[];
   /* value: string | undefined,
    fecha_hora_value: string | undefined,*/
}

type TypeCamaras = {
    id: string,
    name: string,
    sensores: TypeSensor[]
}

type TypeDatos = {
    frio: {
        id: string,
        name: string
    },
    camaras : TypeCamaras[]
}

export class ValorController {
    constructor(
        private readonly valorService: ValorService = new ValorService(),
        private readonly frigorificoService: FrigorificoService = new FrigorificoService(),
        private readonly camaraService: CamaraService = new CamaraService(),
        private readonly sensorService: SensorService = new SensorService(),
        private readonly httpresponse: HttpResponse = new HttpResponse()
    ) {}

    async getValoresSensor(req: Request, res: Response){
        try{
            const {id} = req.params; 
            const data_sensor = await this.sensorService.findSensorById(id);
            if (!data_sensor) {
                return this.httpresponse.NotFound(res, "No existe el sensor registrado");
            }
            const data = await this.valorService.findAllValoresSensor(data_sensor.id)
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay valores almacenados del sensor");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }
    
    async getValoresSensorbyFrio(req: Request, res: Response){
        try{
            const frioId = req.query.frioId as string;
            const data_frio = await this.frigorificoService.findFrigorificoById(frioId);
            if (!data_frio) {
                return this.httpresponse.NotFound(res, "No existe el frigorifico registrado");
            }

            const camaras: TypeCamaras[] = [];

            const data_camara = await this.camaraService.findAllCamara(data_frio.id);
            
           
            if (!data_camara) {
                return this.httpresponse.NotFound(res, "No hay camaras registradas en el frigorifico");
            }           

            for(const camara of data_camara) {
        
                const data_sensor = await this.sensorService.findAllSensorCamara(camara.id);
                const sensores: TypeSensor[] = [];

                for(const sensor of data_sensor) {
                    const data_valor = await this.valorService.findUltimoValorSensor(sensor.id);

                    const sen:TypeSensor = {
                        id: sensor.id,
                        name_db: sensor.name_db,
                        name_front: sensor.name_front,
                        descripcion: sensor.descripcion,
                        tipo_dato: sensor.tipo_dato,
                        tipo_sensor: sensor.tipo_sensor,
                        color_front: sensor.color_front,
                        valores: [{
                            fecha_hora_value: moment(data_valor?.fecha_hora_value).toDate().toISOString(),
                            value: data_valor?.value
                        }]
                        /*value: data_valor?.value,
                        fecha_hora_value: moment(data_valor?.fecha_hora_value).add("-03:00").toDate().toISOString()*/
                    }
                    sensores.push(sen);
                }
                camaras.push({
                    id: camara.id,
                    name: camara.name,
                    sensores: sensores
                })
            }

            const data:TypeDatos = {
                frio: {
                    id: data_frio.id,
                    name: data_frio.name
                },
                camaras: camaras
            }
                            
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }

    async getValoresSensorbyCamara(req: Request, res: Response){
        try{
            const camaraId = req.query.camaraId as string;
            const fechaInicio = moment(req.query.fechaInicio as Date | undefined).toDate(); //as Date | undefined;
            const fechaFin = moment(req.query.fechaFin as Date | undefined).toDate();

          //  console.log("CamaraId", camaraId)
          //  console.log("Fecha inicio", fechaInicio)
         //   console.log("Fecha fin", fechaFin)

            const data_camara = await this.camaraService.findCamaraById(camaraId);
           
            if (!data_camara) {
                return this.httpresponse.NotFound(res, "No esxte la camara");
            }           

        
            const data_sensor = await this.sensorService.findAllSensorCamara(data_camara.id);

            const sensores: TypeSensor[] = [];

            for(const sensor of data_sensor) {
                const data_valor = await this.valorService.findValoresSensor(sensor.id, fechaInicio! , fechaFin!);

                const valores: TypeValor[] = [];

                for(const valor of data_valor) {
                    valores.push(
                        {
                            fecha_hora_value: moment(valor?.fecha_hora_value).toDate().toISOString(),                                    
                            value: valor?.value,
                        }
                    )
                }
                
                const sen:TypeSensor = {
                    id: sensor.id,
                    name_db: sensor.name_db,
                    name_front: sensor.name_front,
                    descripcion: sensor.descripcion,
                    tipo_dato: sensor.tipo_dato,
                    tipo_sensor: sensor.tipo_sensor,
                    color_front: sensor.color_front,
                    valores: valores
                }
                sensores.push(sen);
            }

            const data = sensores;
                            
            return this.httpresponse.OK(res, data);
        }catch(err){
            console.log(err);
            return this.httpresponse.Error(res, err);
        }
    }

    async createValor(req: Request, res: Response){
        try{
            const data = await this.valorService.createValor(req.body);
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async createValores(req: Request, res: Response){
        try{
            const data:InsertResult = await this.valorService.createValores(req.body);
       /*     if (!data .affected) {
                return this.httpresponse.NotFound(res, "Hay un error en actualizar");
            }*/
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


}