import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoArticuloService } from './tipo-articulo.service';
import { CreateTipoArticuloDto } from './dto/create-tipo-articulo.dto';
import { UpdateTipoArticuloDto } from './dto/update-tipo-articulo.dto';

@Controller('tipo-articulo')
export class TipoArticuloController {
  constructor(private readonly tipoArticuloService: TipoArticuloService) { }

  @Post()
  create(@Body() createTipoArticuloDto: CreateTipoArticuloDto) {
    return this.tipoArticuloService.create(createTipoArticuloDto);
  }

  @Get()
  findAll() {
    return this.tipoArticuloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoArticuloService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoArticuloDto: UpdateTipoArticuloDto) {
    return this.tipoArticuloService.update(+id, updateTipoArticuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoArticuloService.remove(+id);
  }
}
