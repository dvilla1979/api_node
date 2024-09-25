import { BaseRouter } from "../shared/router/router";
import { FrigorificoController } from "./controllers/frigorifico.controller";
import { FrigorificoMiddleware } from './middlewares/frigoriico.middleware';


export class FrigorificoRouter extends BaseRouter<FrigorificoController, FrigorificoMiddleware>{
    constructor(){
        super(FrigorificoController, FrigorificoMiddleware);
    }

    routes(): void {
        this.router.get('/frigorificos', this.middleWare.passAuth("jwt") ,(req, res) => 
            this.controller.getFrigorificos(req, res)
        );
        this.router.get('/frigorifico/:id', (req, res) => 
            this.controller.getFrigorificoById(req, res)
        );
        this.router.get('/frigorifico', (req, res) => 
            this.controller.getFrigorificoByName(req, res)
        );
        this.router.post(
            '/createFrigorifico', 
            (req, res, next) => this.middleWare.frigorificoValidator(req, res, next),
            (req, res) => this.controller.createFrigorifico(req, res)
        );
        this.router.put('/updateFrigorifico/:id', (req, res) => 
            this.controller.updateFrigorifico(req, res)
        );
        this.router.delete('/deleteFrigorifico/:id', (req, res) => 
            this.controller.deleteFrigorifico(req, res)
        );
    }
} 