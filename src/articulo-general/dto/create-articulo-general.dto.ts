import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateArticuloGeneralDto {

    @IsOptional()
    @IsString()
    industria?: string;

    @IsBoolean()
    @IsOptional()
    asignado?: boolean;

    // Relaciones
    @IsInt()
    id_marca: number;

    @IsInt()
    id_modelo: number;

    @IsInt()
    id_estado_logico: number;

    @IsInt()
    id_estado_fisico: number;

    @IsInt()
    id_tipo_articulo: number;
}
