import { BaseRouter } from "../shared/router/router";
import { SensorController } from "./controllers/sensor.controller";
import { SensorMiddleware } from "./middlewares/sensor.middleware";

export class SensorRouter extends BaseRouter<SensorController, SensorMiddleware>{
    constructor(){
        super(SensorController, SensorMiddleware);
    }

    routes(): void {
        //this.router.get('/frio_name/:name_frio/sensors', (req, res) => 
        //    this.controller.getSensoresFrigorifico(req, res)
        //);
        this.router.get('/frio/sensors', (req, res) => {
            this.controller.getSensoresFrigorifico(req, res)
        }
    );

        //this.router.get('/frio_name/:name_frio/camara_id/:id', (req, res) => this.controller.getCamaraById(req, res));
        //this.router.get('/frio_name/:name_frio/camara_name/:name_camara', (req, res) => this.controller.getCamaraByName(req, res));
        this.router.post(
            '/createSensor', 
            (req, res, next) => this.middleWare.sensorValidator(req, res, next),
            (req, res) => this.controller.createSensor(req, res)
        );
      //  this.router.put('/updateFrigorifico/:id', (req, res) => this.controller.updtaeFrigorifico(req, res));
      ///  this.router.delete('/deleteFrigorifico/:id', (req, res) => this.controller.deleteFrigorifico(req, res));
    }
} 