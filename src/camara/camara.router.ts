import { BaseRouter } from "../shared/router/router";
import { CamaraController } from "./controllers/camara.controller";
import { CamaraMiddleware } from "./middlewares/camara.middleware";

export class CamaraRouter extends BaseRouter<CamaraController, CamaraMiddleware>{
    constructor(){
        super(CamaraController, CamaraMiddleware);
    }

    routes(): void {
        this.router.get('/camaras'/*, this.middleWare.passAuth("jwt")*/ , (req, res) => 
            this.controller.getCamaras(req, res)
        );        
      /*  this.router.get('/frio_name/:name_frio/camaras', (req, res) => 
            this.controller.getCamaras(req, res)
        );*/
        this.router.get('/frio_name/:name_frio/camara_id/:id', (req, res) => 
            this.controller.getCamaraById(req, res)
        );
        this.router.get('/frio_name/:name_frio/camara_name/:name_camara', (req, res) => 
            this.controller.getCamaraByName(req, res)
        );
        this.router.post(
            '/createCamara',
            (req, res, next) => this.middleWare.camaraValidator(req, res, next), 
            (req, res) => this.controller.createCamara(req, res));
      //  this.router.put('/updateFrigorifico/:id', (req, res) => this.controller.updtaeFrigorifico(req, res));
      ///  this.router.delete('/deleteFrigorifico/:id', (req, res) => this.controller.deleteFrigorifico(req, res));
    }
} 