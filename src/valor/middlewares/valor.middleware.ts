import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { ValorDTO } from "../dto/valor.dto";

export class ValorMiddleware {

    constructor( private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    valorValidator(req: Request, res: Response, next: NextFunction){
        const { value, fecha_hora_value } =
            req.body;
        

        const valid = new ValorDTO();

        valid.value = value;
        valid.fecha_hora_value = fecha_hora_value;
        
        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.NotAcceptable(res, err)
            }
            else {
                next();
            }
        })

    }

    async validateValores(valores: ValorDTO[]){
        const validationErrors = [];
        for (const valor of valores) {
            const errors = await validate(valor);
            if (errors.length > 0) {
                validationErrors.push(errors);
            }
        }
        return validationErrors;
    }

    valoresValidator(req: Request, res: Response, next: NextFunction){

        const dataArray = req.body;

        //Convierte la parte 'data' en un array de objetos
        const arraySensors = dataArray.map((item:any) => {
            return {value: item.value, 
                    fecha_hora_value: item.fecha_hora_value,
            }
        })

        const arrayValid: ValorDTO[] = []
    
        for(const elementSensor of arraySensors){
            const valid = new ValorDTO();
            valid.value = elementSensor.value;
            valid.fecha_hora_value = elementSensor.fecha_hora_value;
            arrayValid.push(valid);
        }
        
        this.validateValores(arrayValid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.NotAcceptable(res, err)
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
