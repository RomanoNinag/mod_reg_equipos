import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateModeloDto {
    @IsString()
    nombre_modelo: string;

    @IsNumber()
    @IsPositive()
    tipo: number;
}
