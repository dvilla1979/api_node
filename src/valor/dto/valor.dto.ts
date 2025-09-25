import { IsDateString, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ValorDTO /*extends BaseDTO*/ {

    @IsNotEmpty()
    sensor_id!: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_hora_value!: Date;

    @IsNotEmpty()
    value!: string;


}


