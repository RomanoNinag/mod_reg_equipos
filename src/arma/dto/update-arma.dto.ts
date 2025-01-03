import { PartialType } from '@nestjs/mapped-types';
import { CreateArmaDto } from './create-arma.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateArmaDto extends PartialType(CreateArmaDto) {
    @IsString()
    @IsUUID()
    id: string;
}
