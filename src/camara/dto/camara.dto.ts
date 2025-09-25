import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CamaraDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    tipo_camara!: CamaraType;

    @IsNotEmpty()
    orden!: string;    
}

export enum CamaraType{
    CAMARA_AMONIACO = "CAMARA_AMONIACO", //Representa una Camara de Amoniaco con Ventiladores, Sol. de Aspiracion y Liquido, Sol, Deshielo, etc,
    CAMARA_GLICOL = "CAMARA_GLICOL", //Representa una Camara de Glicol con Ventiladores, Bomba GLicol, Valvula Glicol, Sol, Deshielo, etc,
    COMPRESOR = "COMPRESOR", //Representa un Compresor con Estado Funcionamiento, Capacidad, etc
    SALA_MAQUINAS = "SALA_MAQUINAS", //Representa los sensores de presion , Estados general de funcionamiento, etc.
    MEDIDAS_ELECTRICAS = "MEDIDAS ELECTRICAS", //Representa los valores de medidas electricas: potencia, tension, corriente, etc.
}