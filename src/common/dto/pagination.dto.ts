import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limite: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    pagina: number;
}