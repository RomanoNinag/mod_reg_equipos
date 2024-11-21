import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoLogicoDto } from './create-estado-logico.dto';

export class UpdateEstadoLogicoDto extends PartialType(CreateEstadoLogicoDto) {}
