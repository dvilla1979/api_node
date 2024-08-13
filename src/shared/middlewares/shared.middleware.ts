import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";


export class SharedMiddleware {
    constructor(public readonly httpResponse: HttpResponse = new HttpResponse()){}

    passAuth(type:string){
        return passport.authenticate(type, {session: false}); //No se trabaja con sesiones
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction){ 
       const user = req.user as UserEntity;

       if(user.role !== RoleType.ADMIN){
        return this.httpResponse.Unauthorized(res, "No tienes permiso");
       }

       return next()


    }
}