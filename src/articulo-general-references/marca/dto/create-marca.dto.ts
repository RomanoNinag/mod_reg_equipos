import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class CreateMarcaDto {
    @IsString()
    @MinLength(1)
    nombre_marca: string;

    // tipo: {arma: 1, equipo: 2}
    @IsNumber()
    @IsPositive()
    tipo: number;
    // tipo: {
    //     code: number;
    //     nombre: string;
    // }

}
