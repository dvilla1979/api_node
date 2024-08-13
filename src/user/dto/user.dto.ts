import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    jobPositions?: string;

    @IsNotEmpty()
    numberPhone!: number;     

    @IsNotEmpty()
    role!: RoleType;
}

export enum RoleType{
    USER = "USER",
    GERENTE = "GERENTE",
    ADMIN = "ADMIN"
}