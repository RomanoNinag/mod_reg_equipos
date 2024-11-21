import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateEstadoFisicoDto {
    @IsString()
    nombre_estado_fisico: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    descripcion_estado_fisico?: string;

    @IsInt()
    tipo: number;
}
