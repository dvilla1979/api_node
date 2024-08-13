import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CamaraDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;
}