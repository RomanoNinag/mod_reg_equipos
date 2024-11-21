import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateArticuloGeneralDto } from "src/articulo-general/dto/create-articulo-general.dto";

export class CreateArmaDto extends CreateArticuloGeneralDto {
    @IsString()
    cod_registro: string;

    @IsOptional()
    @IsString()
    serie?: string;

    @IsOptional()
    @IsString()
    calibre?: string;

    @IsOptional()
    @IsInt()
    nro_cargador?: number;

    @IsInt()
    capacidad_cargador: number;

    @IsInt()
    capacidad_tambor: number;

    @IsOptional()
    @IsString()
    acabado?: string;
}
