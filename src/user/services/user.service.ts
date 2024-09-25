import { DeleteResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { RoleType, UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { FrigorificoDTO } from '../../frigorifico/dto/frigorifico.dto';

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity)
    }

    async findAllUser(): Promise<UserEntity[]>{
        return (await this.execRepository).find();
    }

    async findUserById(id: string):Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({id});
    }

    async findUserWithRole(
        id: string,
        role: RoleType
      ): Promise<UserEntity | null> {
        const user = (await this.execRepository)
          .createQueryBuilder("user")
          .where({ id })
          .andWhere({ role })
          .getOne();    
        return user;
      }

    async findUserFrigorificosById(id: string): Promise<UserEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.frigorifico", "frigorifico")
            .where({id})
            .getOne();
    }

    async findAllUsersFrigorificos(): Promise<UserEntity[] | null>{
        return (await this.execRepository)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.frigorifico", "frigorifico")
            .getMany();
    }
    
    async findUserByEmail(email: string):Promise<UserEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({email})
            .getOne();
    }

    async findUserByUsername(username: string):Promise<UserEntity | null>{
        return (await this.execRepository)
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where({username})
        .getOne();  
    }
    


    async createUser(body: UserDTO):Promise<UserEntity>{
        const newUser = (await this.execRepository).create(body); //Crea el usuario en "memoria"
        const hash = await bcrypt.hash(newUser.password, 10); //la base de datos se transforma a simbolos por seguridad
        newUser.password = hash;
        return (await this.execRepository).save(newUser); //Guarda el usuario en la base de datos
    }

    async deleteUser(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }

    async updateUser(id: string, infoUpdate: UserDTO, friosUpdate: FrigorificoDTO[]):Promise<UserEntity | null>{
        const User = await this.findUserById(id);
        const UserPas = await this.findUserByUsername(User!.username); //Recupera password

        var Userupdate = {};

        Userupdate = {id: UserPas!.id}

        if(UserPas!.username !== infoUpdate.username)
           Userupdate = {...Userupdate, username: infoUpdate.username}
        if(UserPas!.name !== infoUpdate.name)
            Userupdate = {...Userupdate, name: infoUpdate.name}
        if(UserPas!.lastname !== infoUpdate.lastname)
            Userupdate = {...Userupdate, lastname: infoUpdate.lastname}
        if(UserPas!.email !== infoUpdate.email)
            Userupdate = {...Userupdate, email: infoUpdate.email}  
        if(infoUpdate.password) {
            const isMatch = await bcrypt.compare(UserPas!.password, infoUpdate.password);
            if(isMatch === false) {
                const hash = await bcrypt.hash(infoUpdate.password, 10);
                Userupdate = {...Userupdate, password: hash}
            }
        }
        if(UserPas!.jobPositions !== infoUpdate.jobPositions)
            Userupdate = {...Userupdate, jobPositions: infoUpdate.jobPositions}  
        if(UserPas!.numberPhone !== infoUpdate.numberPhone)
            Userupdate = {...Userupdate, numberPhone: infoUpdate.numberPhone}  
        if(UserPas!.role !== infoUpdate.role)
            Userupdate = {...Userupdate, role: infoUpdate.role}  
        if(UserPas!.frigorifico !== friosUpdate)
            Userupdate = {...Userupdate, frigorifico: friosUpdate}
             
        return (await this.execRepository).save(Userupdate);
}

}