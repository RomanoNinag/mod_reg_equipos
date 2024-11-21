import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateEstadoLogicoDto {
    @IsString()
    nombre_estado_logico: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    descripcion_estado_logico?: string;

    @IsInt()
    tipo: number;
}
