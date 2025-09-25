import { IsDateString, IsEmpty, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class SensorDTO extends BaseDTO {
    @IsNotEmpty()
    name_db!: string;

    @IsNotEmpty()
    name_front!: string;

    @IsNotEmpty()
    historico!: boolean;

    @IsNotEmpty()
    descripcion!: string;

    @IsNotEmpty()
    tipo_dato!: SensorDato;

    @IsNotEmpty()
    tipo_sensor!: SensorType;

    @IsNotEmpty()
    color_front!: SensorColor;

    @IsNotEmpty()
    max_grafico!: number;

    @IsNotEmpty()
    min_grafico!: number;

    @IsNotEmpty()
    orden!: string;

    @IsNotEmpty()
    value!: string;

    @IsDateString()
    fecha_hora_value!: Date;

    @IsNotEmpty()
    color_fondo!: string;
    
    @IsNotEmpty()
    color_fuente!: string;
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
    REAL_DIV_10 = "REAL_DIV_10",
    STRING = "STRING"
}

export enum SensorType{
    TEMPERATURA = "TEMPERATURA", //Valor de Temepratura en ºC -> REAL_DIV_10
    HUMEDAD = "HUMEDAD", //Valor de Humedad en % -> REAL_DIV_10
    PRESION = "PRESION", //Valor de Presion en Bar -> REAL_DIV_10
    CAPACIDAD = "CAPACIDAD", //Valor de Capacidad en % -> INT16
    POTENCIA = "POTENCIA", //Valor de Potencia en KW -> INT32
    TENSION = "TENSION", //Valor de Tension en V -> INT32
    CORRIENTE = "CORRIENTE", //Valor de Corriente en A -> INT32
    COSENO_PHI = "COSENO_PHI", //Valor de Cosenso Phi -> REAL
    VELOCIDAD_HZ = "VELOCIDAD_HZ", //Valor de Velocidad en Hz -> REAL_DIV_10
    VELOCIDAD_100 = "VELOCIDAD_100", //Valor de Velocidad en % -> INT16
    MENSAJE_FUNCIONAMIENTO = "MENSAJE_FUNCIONAMIENTO", //Mensaje general de funcionamiento de Camaras, Sala de Maquinas, etc. -> STRING
    ESTADO_VENTILADORES = "ESTADO_VENTILADORES", // ON-OFF Ventiladores -> BOOLEAN 
    ESTADO_SOL_ASPIRACION = "ESTADO_SOL_ASPIRACION", // ON-OFF Sol. de Aspiracion -> BOOLEAN 
    ESTADO_SOL_LIQUIDO = "ESTADO_SOL_LIQUIDO", // ON-OFF Sol. de Liquido -> BOOLEAN 
    ESTADO_SOL_DESHIELO = "ESTADO_SOL_DESHIELO", // ON-OFF Sol. de Deshielo -> BOOLEAN 
    ESTADO_COMPRESOR = "ESTADO_COMPRESOR", // ON-OFF Motor Compresor -> BOOLEAN 
    ESTADO_TORNILLO = "ESTADO_TORNILLO", // ON-OFF Motor Compresor Tornillo-> BOOLEAN 
    ESTADO_BOMBA = "ESTADO_BOMBA", // ON-OFF Motor Bomba  -> BOOLEAN 
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


