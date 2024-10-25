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
        this.router.get('/frio/sensors', (req, res, next) => this.middleWare.identifyRequest(req, res, next) ,(req, res) => {
            this.controller.getSensoresFrigorifico(req, res)
        }
        );

        this.router.get('/sensores', (req, res) => {
            this.controller.getSensoresCamaraById(req, res)
        }
        );

        //this.router.get('/frio_name/:name_frio/camara_id/:id', (req, res) => this.controller.getCamaraById(req, res));
        //this.router.get('/frio_name/:name_frio/camara_name/:name_camara', (req, res) => this.controller.getCamaraByName(req, res));
        this.router.post(
            '/createSensor',
            this.middleWare.passAuth("jwt"), 
            (req, res, next) => this.middleWare.sensorValidator(req, res, next),
            (req, res) => this.controller.createSensor(req, res)
        );
        this.router.put('/updateSensor/:id', (req, res) => this.controller.updateSensor(req, res));
        this.router.delete('/deleteSensor/:id', (req, res) => this.controller.deleteSensor(req, res));
    }
} 