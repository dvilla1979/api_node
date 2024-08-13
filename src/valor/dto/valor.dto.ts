import { IsDateString, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ValorDTO extends BaseDTO {

    @IsNotEmpty()
    value!: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_hora_value!: Date;
}


