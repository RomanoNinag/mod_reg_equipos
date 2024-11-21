import { IsString } from "class-validator";
import { CreateArticuloGeneralDto } from "src/articulo-general/dto/create-articulo-general.dto";

export class CreateEquipoDto extends CreateArticuloGeneralDto{

    @IsString()
    cod_registro: string;
}
