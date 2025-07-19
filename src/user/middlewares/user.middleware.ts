import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
//import { HttpResponse } from "../../shared/response/http.response";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class UserMiddleware extends SharedMiddleware {

    constructor(){
        super();
    }

    userValidator(req: Request, res: Response, next: NextFunction){
        const { username, name, lastname, email, password, jobPositions, numberPhone, role } =
            req.body;
        

        const valid = new UserDTO();

        valid.username = username;
        valid.name = name;
        valid.lastname = lastname;
        valid.email = email;
        valid.password = password;
        valid.jobPositions = jobPositions;
        valid.numberPhone = numberPhone;
        valid.role = role;
        
        validate(valid).then((err)=>{
            if (err.length > 0) {
                //console.log("Hola desde Error validator usuario", err)
                //return this.httpResponse.NotAcceptable(res, err)
                return this.httpResponse.NotAcceptable(res, "Faltan datos o son invalidos")
            }
            else {
                next();
            }
        })

    }

}
