import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { SensorDTO } from "../dto/sensor.dto";

export class SensorMiddleware {

    constructor( private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    sensorValidator(req: Request, res: Response, next: NextFunction){
        const {name_db, name_front, descripcion, tipo_dato, tipo_sensor, color_front} =
            req.body;
        const valid = new SensorDTO();

        valid.name_db = name_db;
        valid.name_front = name_front;
        valid.descripcion = descripcion;
        valid.tipo_dato = tipo_dato;
        valid.tipo_sensor = tipo_sensor;
        valid.color_front = color_front;
        
        validate(valid).then((err)=>{
            if (err.length > 0) {
                console.log("no validadadp", req.body);
                return this.httpResponse.Error(res, err)
            }
            else {
                console.log("validadadp", req.body);
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
