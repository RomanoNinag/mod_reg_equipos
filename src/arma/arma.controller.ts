import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ArmaService } from './arma.service';
import { CreateArmaDto } from './dto/create-arma.dto';
import { UpdateArmaDto } from './dto/update-arma.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('arma')
export class ArmaController {
  constructor(private readonly armaService: ArmaService) { }

  @Post()
  @MessagePattern('create.articulo.arma')
  create(@Payload() createArmaDto: CreateArmaDto) {
    return this.armaService.create(createArmaDto);
  }

  @Get()
  @MessagePattern('get.articulo.arma')
  findAll() {
    return this.armaService.findAll();
  }

  @MessagePattern('get.articulo.arma.disponible')
  findDisponibles() {
    return this.armaService.findDisponibles();
  }
  @MessagePattern('get.articulo.arma.asignado')
  findAsignados() {
    return this.armaService.findAsignados();
  }
  // @Get('referencia')
  @MessagePattern('get.articulo.arma.referencia')
  findReferences() {
    return this.armaService.getReferencias();
  }
  @Get('referencia/marca')
  @MessagePattern('get.articulo.arma.referencia.marca')
  findReferencesMarca() {
    return this.armaService.getMarcas();
  }

  @Get('referencia/modelo')
  @MessagePattern('get.articulo.arma.referencia.modelo')
  findReferencesModelo() {
    return this.armaService.getModelos();
  }

  @Get(':id')
  @MessagePattern('get.articulo.arma.id')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.armaService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('update.articulo.arma')
  update(@Payload() updateArmaDto: UpdateArmaDto) {
    return this.armaService.update(updateArmaDto.id, updateArmaDto);
  }

  @Delete(':id')
  @MessagePattern('delete.articulo.arma')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.armaService.softDelete(id);
  }
}
