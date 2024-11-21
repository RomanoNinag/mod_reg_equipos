import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoArticuloDto } from './create-tipo-articulo.dto';

export class UpdateTipoArticuloDto extends PartialType(CreateTipoArticuloDto) {}
