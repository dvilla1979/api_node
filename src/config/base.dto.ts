import { IsOptional, IsUUID, IsDate } from "class-validator";


export class BaseDTO {

    @IsUUID()
    @IsOptional()
    id!: string;

   /* @IsDate()
    @IsOptional()
    createdAt!: Date;

    @IsDate()
    @IsOptional()
    updatedAt!: Date;*/
}