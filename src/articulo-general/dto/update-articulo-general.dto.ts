import { PartialType } from '@nestjs/mapped-types';
import { CreateArticuloGeneralDto } from './create-articulo-general.dto';

export class UpdateArticuloGeneralDto extends PartialType(CreateArticuloGeneralDto) {}
