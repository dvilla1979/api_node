import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
//import { HttpResponse } from "../../shared/response/http.response";
import { FrigorificoDTO } from "../dto/frigorifico.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class FrigorificoMiddleware extends SharedMiddleware {

   /* constructor( private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}*/

    constructor(){
        super();
    }
    frigorificoValidator(req: Request, res: Response, next: NextFunction){
        const { name, ubicacion, orden } =
            req.body;
        

        const valid = new FrigorificoDTO();

        valid.name = name;
        valid.ubicacion = ubicacion;
        valid.orden = orden;
        
        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.NotAcceptable(res, "Faltan datos o son invalidos")
            }
            else {
                next();
            }
        })

    }

}
