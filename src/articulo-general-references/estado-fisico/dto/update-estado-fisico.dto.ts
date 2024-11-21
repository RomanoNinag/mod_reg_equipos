import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoFisicoDto } from './create-estado-fisico.dto';

export class UpdateEstadoFisicoDto extends PartialType(CreateEstadoFisicoDto) {}
