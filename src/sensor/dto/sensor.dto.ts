import { IsEmpty, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class SensorDTO extends BaseDTO {
    @IsNotEmpty()
    name_db!: string;

    @IsNotEmpty()
    name_front!: string;

    @IsNotEmpty()
    descripcion!: string;

    @IsNotEmpty()
    tipo_dato!: SensorDato;

    @IsNotEmpty()
    tipo_sensor!: SensorType;

    @IsNotEmpty()
    color_front!: SensorColor;

}

export enum SensorDato{
    BOOLEAN = "BOOLEAN",
    INT16 = "INT16",
    INT32 = "INT32",
    FECHA_HORA = "FECHA_HORA",
    FECHA = "FECHA",
    SEMANA_HORA = "SEMANA_HORA",
    DIA_HORA = "DIA_HORA",
    HORA = "HORA",
    REAL = "REAL",
    REAL_DIV_10 = "REAL_DIV_10"
}

export enum SensorType{
    TEMPERATURA = "TEMPERATURA",
    PRESION = "PRESION",
    POTENCIA = "POTENCIA"
}

export enum SensorColor{
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    BLACK = "BLACK",
    ORANGE = "ORANGE",
    YELLOW = "YELLOW",
    PURPLE = "PURPLE",
    PINK = "PINK",
    BROWN = "BROWN",
    WHITE = "WHITE",
}


