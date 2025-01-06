import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) { }

  @Post()
  @MessagePattern('create.articulo.equipo')
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get()
  @MessagePattern('get.articulo.equipo')
  findAll() {
    return this.equipoService.findAll();
  }

  @Get('referencia')
  @MessagePattern('get.articulo.equipo.referencia')
  findReferences() {
    return this.equipoService.getCachedData();
  }
  @Get('referencia/marca')
  @MessagePattern('get.articulo.equipo.referencia.marca')
  findReferencesMarca() {
    return this.equipoService.getMarcas();
  }

  @Get('referencia/modelo')
  @MessagePattern('get.articulo.equipo.referencia.modelo')
  findReferencesModelo() {
    return this.equipoService.getModelos();
  }

  @Get(':id')
  @MessagePattern('get.articulo.equipo.id')
  findOne(@Payload('id') id: string) {
    return this.equipoService.findOneById(id);
  }

  @Patch(':id')
  @MessagePattern('update.articulo.equipo')
  update(@Payload() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.update(updateEquipoDto.id, updateEquipoDto); //TODO manejar errores de validacion
  }

  @Delete(':id')
  @MessagePattern('delete.articulo.equipo')
  remove(@Payload('id') id: string) {
    return this.equipoService.softDelete(id);
  }
}
