import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.services";
import { Request, Response } from "express";

export class AuthController extends AuthService {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    //Funcion encargada de hacer la autenticacion
    async login(req: Request, res: Response) {
        try {
           
            const userEncode = req.user as UserEntity;
            //const userEncode = req.body as UserEntity;
            const encode = await this.generateJWT(userEncode);

            if(!encode){ 
                return this.httpResponse.Unauthorized(res, "No tienes permisos");
            }

            res.header('Content-Type', 'application/json');
            res.cookie("accessToken", encode.accessToken, {maxAge: 60000 * 60}); //Una hora dura la sesion despues la cookie cierra la sesion
            res.write(JSON.stringify(encode));
            res.end();

        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res, error);
        }


    }
}