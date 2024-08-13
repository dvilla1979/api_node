import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class FrigorificoDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;
}