import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { UserRouter } from "./user/user.router";
import { FrigorificoRouter } from './frigorifico/frigorifico.router';
import { CamaraRouter } from "./camara/camara.router";
import { SensorRouter } from "./sensor/sensor.router";
import { ValorRouter } from "./valor/valor.router";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/auth.router";

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;

    constructor(){
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.passportUse();
        this.dbConnect();
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use("/api", this.routers());
        this.listen(); 
    }

    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new FrigorificoRouter().router,
            new CamaraRouter().router,
            new SensorRouter().router,
            new ValorRouter().router,
            new AuthRouter().router
        ];  
    }

    passportUse(){
        return [new LoginStrategy().use, new JwtStrategy().use]
    }

    async dbConnect():Promise<DataSource | void> {
        return this.initConnect
            .then(()=>{
                    console.log("Connect Success");
            }).catch((err)=>{
                    console.error(err);
            });
    }


    public listen() {
        this.app.listen(this.port, ()=>{
            console.log("Server listenning on port =>", this.port);
        })
    }
}

new ServerBootstrap();