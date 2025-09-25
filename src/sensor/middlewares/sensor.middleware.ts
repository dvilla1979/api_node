import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { SensorDTO } from "../dto/sensor.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class SensorMiddleware  extends SharedMiddleware {

   /* constructor( private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}*/

   constructor(){
    super();
}

    sensorValidator(req: Request, res: Response, next: NextFunction){

        console.log("Sensor Validator", req.body);

        const {name_db, name_front, descripcion, tipo_dato, tipo_sensor, color_front, max_grafico, min_grafico, 
            orden, historico, value, fecha_hora_value, color_fondo, color_fuente } =
            req.body;
        const valid = new SensorDTO();

        valid.name_db = name_db;
        valid.name_front = name_front;
        valid.descripcion = descripcion;
        valid.tipo_dato = tipo_dato;
        valid.tipo_sensor = tipo_sensor;
        valid.color_front = color_front;
        valid.max_grafico = max_grafico;
        valid.min_grafico = min_grafico;
        valid.orden = orden;
        valid.historico = historico;
        valid.value = value;
        valid.fecha_hora_value = fecha_hora_value;
        valid.color_fondo = color_fondo;
        valid.color_fuente = color_fuente;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.NotAcceptable(res, "Faltan datos o son invalidos con error " + err )
            }
            else {
                next();
            }
        })

    }

    identifyRequest(req: Request, res: Response, next: NextFunction){
        const apiKey = req.headers['api-key'];
        if(apiKey && apiKey === "clave secreta"){
            next()
        }
        else{
            return this.httpResponse.Unauthorized(res)
        }
    }

}
