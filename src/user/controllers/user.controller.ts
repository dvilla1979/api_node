import { Request, Response } from "express";
import { UserService } from '../services/user.service';
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(), 
        private readonly httpresponse: HttpResponse = new HttpResponse()
    ) {}
    async getUsers(req: Request, res: Response){
        try{
            const data = await this.userService.findAllUser();
            if (data.length === 0) {
                return this.httpresponse.NotFound(res, "No hay usuarios registrados");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getUserById(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data = await this.userService.findUserById(id);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el usuario registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async getUserWithRealtionById(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data = await this.userService.findUserByRelations(id);
            if (!data) {
                return this.httpresponse.NotFound(res, "No existe el usuario registrado");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async createUser(req: Request, res: Response){
        try{
            const data = await this.userService.createUser(req.body);
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }

    async updateUser(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: UpdateResult = await this.userService.updateUser(id, req.body);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en actualizar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


    async deleteUser(req: Request, res: Response){
        const {id} = req.params; 
        try{
            const data: DeleteResult = await this.userService.deleteUser(id);
            if (!data.affected) {
                return this.httpresponse.NotFound(res, "Hay un error en borrar");
            }
            return this.httpresponse.OK(res, data);
        }catch(err){
            return this.httpresponse.Error(res, err);
        }
    }


}