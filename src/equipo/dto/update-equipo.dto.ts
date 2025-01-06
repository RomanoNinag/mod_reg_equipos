import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoDto } from './create-equipo.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {
    @IsString()
    @IsUUID()
    id: string;
}
