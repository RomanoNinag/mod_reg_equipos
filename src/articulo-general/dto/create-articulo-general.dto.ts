import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateArticuloGeneralDto {
    @IsDate()
    @Type(() => Date)
    fecha_registro: Date;

    @IsOptional()
    @IsString()
    procedencia?: string;

    @IsOptional()
    @IsString()
    industria?: string;

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
