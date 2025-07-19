import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { CamaraDTO } from "../dto/camara.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class CamaraMiddleware  extends SharedMiddleware  {

   /* constructor( private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}*/

    constructor(){
        super();
    }

    camaraValidator(req: Request, res: Response, next: NextFunction){
        const { name, orden } =
            req.body;      
        const valid = new CamaraDTO();

        valid.name = name;
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
