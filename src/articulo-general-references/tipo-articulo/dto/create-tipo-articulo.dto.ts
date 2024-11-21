import { IsInt, IsString } from "class-validator";

export class CreateTipoArticuloDto {
    @IsString()
    nombre_tipo_articulo: string;

    @IsInt()
    tipo: number;
}
