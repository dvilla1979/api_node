import { BaseRouter } from "../shared/router/router";
import { ValorController } from "./controllers/valor.controller";
import { ValorMiddleware } from "./middlewares/valor.middleware";

export class ValorRouter extends BaseRouter<ValorController, ValorMiddleware>{
    constructor(){
        super(ValorController, ValorMiddleware);
    }

    routes(): void {
        //this.router.get('/users', (req, res) => this.controller.getUsers(req, res));
        this.router.get('/valores_sensor/:id', (req, res) => 
            this.controller.getValoresSensor(req, res)
        );

        //Con el id del frigorifico devuelve el ultimo valor de cada sensor del frigorifico
        this.router.get('/valoresfrio', (req, res) => 
            this.controller.getValoresSensorbyFrio(req, res)
        );

        //Con el id de la camara devuelve los valores (fecha inicio a fecha fin) de cada sensor de la camara
        this.router.get('/valoresCamara', (req, res) => 
            this.controller.getValoresSensorbyCamara(req, res)
        );

        //this.router.get('/userRel/:id', (req, res) => this.controller.getUserWithRealtionById(req, res));
        this.router.post(
            '/createValor',
            (req, res, next) => this.middleWare.valorValidator(req, res, next),
            (req, res) => this.controller.createValor(req, res)
        );
        this.router.post(
            '/createValores',
            (req, res, next) => this.middleWare.identifyRequest(req, res, next),
            (req, res, next) => this.middleWare.valoresValidator(req, res, next),
            (req, res) => this.controller.createValores(req, res)
        );

        //this.router.put('/updateUser/:id', (req, res) => this.controller.updateUser(req, res));
        //this.router.delete('/deleteUser/:id', (req, res) => this.controller.deleteUser(req, res));
    }
} 