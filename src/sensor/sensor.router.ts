import { BaseRouter } from "../shared/router/router";
import { SensorController } from "./controllers/sensor.controller";
import { SensorMiddleware } from "./middlewares/sensor.middleware";

export class SensorRouter extends BaseRouter<SensorController, SensorMiddleware>{
    constructor(){
        super(SensorController, SensorMiddleware);
    }

    routes(): void {

        //RUTAS UTILIZADAS POR LA PAGINA WEBROKA

        this.router.get(
            '/sensores', 
            (req, res) => {this.controller.getSensoresCamaraById(req, res)}
        );

        this.router.post(
            '/createSensor',
            this.middleWare.passAuth("jwt"), 
            (req, res, next) => this.middleWare.sensorValidator(req, res, next),
            (req, res) => this.controller.createSensor(req, res)
        );
        this.router.put(
            '/updateSensor/:id',
            this.middleWare.passAuth("jwt"), 
            (req, res) => this.controller.updateSensor(req, res)
        );
        this.router.delete(
            '/deleteSensor/:id',
            this.middleWare.passAuth("jwt"), 
            (req, res) => {this.controller.deleteSensor(req, res)}
        );


        //RUTAS UTILIZADAS POR CADA SCADA DE CADA FRIGORIFICO
        
        this.router.get(
            '/frio/sensors', 
            (req, res, next) => this.middleWare.identifyRequest(req, res, next) ,
            (req, res) => {this.controller.getSensoresFrigorifico(req, res)}
        );
        this.router.put(
            '/updatevaloresSensores/',
            (req, res, next) => this.middleWare.identifyRequest(req, res, next),
            (req, res) => this.controller.updateValoresSensores(req, res)
        );
    }
} 