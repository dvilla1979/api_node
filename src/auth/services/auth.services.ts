import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken" //Es para hacer la firma del token
import * as bcrypt from 'bcrypt'; //Es para comparar la contraseña con la encryptada
import { UserService } from '../../user/services/user.service';
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from '../interface/auth.interface';

export class AuthService extends ConfigServer { //Se extiende para poder usar variables de entorno
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt,
    ) {
        super();
    }

    public async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this.userService.findUserByEmail(username);
        const userByUsername = await this.userService.findUserByUsername(username);

        if (userByUsername){
            const isMatch = await bcrypt.compare(password, userByUsername.password);
            if(isMatch)
                return userByUsername;
        }
        if (userByEmail){
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            if(isMatch)
                return userByEmail;
        }

        return null;
    }

    sing(payload: jwt.JwtPayload, secret: any) {
        return this.jwtInstance.sign(payload, secret);
    }

    public async generateJWT(user: UserEntity):Promise<{accessToken: string, user: UserEntity}> {
        
        const userConsult = await this.userService.findUserWithRole(
            user.id, 
            user.role
        );

        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id
        };

        if(userConsult){
            user.password = "Not Permission"; //Para no enviar el password verdadero
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment("JWT_SECRET")),
            user
        }

    } 

}