import { Router } from 'express';

export class BaseRouter <T, U> {
    public router: Router;
    public controller: T;
    public middleWare: U;

    constructor(Tcontroller: {new (): T}, UMiddleware: {new (): U}){
        this.router = Router();
        this.controller = new Tcontroller();
        this.middleWare = new UMiddleware();
        this.routes();
    }

    routes(){};
}