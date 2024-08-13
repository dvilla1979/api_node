import { UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.services';
import { PassportUse } from '../utils/passport.use';
import { Strategy as LocalStrategy, VerifyFunction} from 'passport-local';


const authService: AuthService = new AuthService();

//Estartegia Local
export class LoginStrategy {
    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity> { //retorna un usuario
        const user = await authService.validateUser(username, password);
        if (!user) { 
            //No se encontro el usuario
            return done(null, false, { message: "Invalid username or password"});
        }
        return done(null, user);

    }; 

    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction> (
            "login", LocalStrategy, {
                usernameField: "username",
                passwordField: "password",
            }, this.validate
        )
    }
}