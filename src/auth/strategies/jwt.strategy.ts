import { PayloadToken } from "../interface/auth.interface";
import { AuthService } from "../services/auth.services";
import { Strategy as JwtStr, StrategyOptions, ExtractJwt} from "passport-jwt";
import { PassportUse } from "../utils/passport.use";

export class JwtStrategy extends AuthService {
    constructor(){
        super();
    }

    async validate(payload: PayloadToken, donde: any){
        return donde(null, payload);
    }

    get use(){
        return PassportUse<
            JwtStr, 
            StrategyOptions, 
            (payload: PayloadToken, done: any)=> Promise<PayloadToken>
        >(
            "jwt",
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment("JWT_SECRET"),
                ignoreExpiration: false,
            }, 
            this.validate
        );
    }
}